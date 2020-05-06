// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
// GraphQL imports
import { useQuery, useMutation } from "@apollo/react-hooks";
import { listEmployees } from "../graphql/queries";
import {
  deleteEmployee as deleteEmployeeMutation,
  deleteSkillUser as deleteSkillUserMutation,
} from "../graphql/mutations";
import gql from "graphql-tag";
// Actions
import deleteSkillUserAction from "../actions/deleteSkillUserAction";
// Helpers
import { messages } from "../constants.js";

const { title, input, form } = messages;

// Styles
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: "bisque",
  },
}));

const TableEmployeeComponent = ({ history }) => {
  const classes = useStyles();
  // react apollo hooks
  const { loading, data, error } = useQuery(gql(listEmployees));
  const [deleteEmployee] = useMutation(gql(deleteEmployeeMutation));
  const [deleteSkillUser] = useMutation(gql(deleteSkillUserMutation));

  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "id",
        cellStyle: {
          backgroundColor: "#EEE",
        },
        headerStyle: {
          backgroundColor: "#EEE",
          fontWeight: "bold",
        },
      },
      {
        title: input.firstName,
        field: "firstname",
        headerStyle: {
          fontWeight: "bold",
        },
      },
      {
        title: input.lastName,
        field: "lastname",
        cellStyle: {
          backgroundColor: "#EEE",
        },
        headerStyle: {
          backgroundColor: "#EEE",
          fontWeight: "bold",
        },
      },
      {
        title: input.skills,
        field: "skills",
        headerStyle: {
          fontWeight: "bold",
        },
        render: (rowData) => {
          return (
            <div>
              {rowData.skills.items.length
                ? rowData.skills.items.map((item, index) => {
                    return (
                      <Chip
                        key={`${index}-${item.skillID}`}
                        label={item.skillID.toUpperCase()}
                        className={classes.chip}
                      />
                    );
                  })
                : null}
            </div>
          );
        },
      },
    ],
    data: [],
  });

  // Business logic
  const removeEmployee = (selectedEmployee, resolve) => {
    const { skills: selectedSkills, id: selectedEmployeeId } = selectedEmployee;

    const updateCache = (client) => {
      const data = client.readQuery({ query: gql(listEmployees) });
      const newItems = data.listEmployees.items.filter(
        (employee) => employee.id !== selectedEmployee.id
      );
      client.writeQuery({
        query: gql(listEmployees),
        data: {
          listEmployees: { ...data.listEmployees, items: newItems },
        },
      });
      resolve();
    };
    // Remove connections to an employee from all skills
    let promises = deleteSkillUserAction(selectedSkills.items, deleteSkillUser);

    Promise.all(promises)
      .then((results) => {
        // Remove employee from the db
        deleteEmployee({
          variables: {
            input: {
              id: selectedEmployeeId,
            },
          },
          update: updateCache,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateEmployee = (rowData) => {
    history.push(`update/${rowData.id}`);
  };

  const actions = [
    {
      icon: "edit",
      tooltip: "Edit",
      onClick: (event, rowData) => {
        updateEmployee(rowData);
      },
    },
  ];

  // Props for return
  const tableProps = {
    actions,
    columns: state.columns,
    className: classes.chip,
    data: state.data,
    editable: {
      onRowDelete: (rowData) =>
        new Promise((resolve) => {
          return removeEmployee(rowData, resolve);
        }),
    },
    title: title.employeesTable,
  };

  if (loading) return <p>{form.loading}</p>;
  if (error) return <p>{error.message}</p>;

  tableProps.data = data.listEmployees.items;

  // Render table
  return <MaterialTable {...tableProps} />;
};

export default withRouter(TableEmployeeComponent);
