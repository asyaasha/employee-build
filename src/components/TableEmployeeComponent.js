// React imports
import React from "react";
// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
// GraphQL imports
import { Query, Mutation } from "react-apollo";
import { useQuery, useMutation } from "react-apollo";
import { listEmployees } from "../graphql/queries";
import { deleteEmployee as deleteEmployeeMutation } from "../graphql/mutations";
import gql from "graphql-tag";
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

const TableEmployeeComponent = () => {
  const classes = useStyles();
  // apollo react hooks
  const { loading, data, error } = useQuery(gql(listEmployees));
  const [deleteEmployee] = useMutation(gql(deleteEmployeeMutation));

  const [state, setState] = React.useState({
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
              {rowData.skills
                ? rowData.skills.items.map((item, index) => {
                    return (
                      <Chip
                        key={`${index}-${item.skill.id}`}
                        label={item.skill.name.toUpperCase()}
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
  const actions = [
    {
      icon: "edit",
      tooltip: "Edit",
      onClick: (event, rowData) => {
        // TODO edit action
        console.log(JSON.stringify(rowData));
      },
    },
    {
      icon: "delete",
      tooltip: "Delete",
      onClick: (event, rowData) => {
        deleteEmployee({
          variables: {
            input: {
              id: rowData.id,
            },
          },
        });
        // TODO update UI
      },
    },
  ];

  // Props for return
  const tableProps = {
    actions,
    columns: state.columns,
    className: classes.chip,
    data: state.data,
    title: title.employeesTable,
  };

  if (loading) return <p>{form.loading}</p>;
  if (error) return <p>{error.message}</p>;

  tableProps.data = data.listEmployees.items;

  // Render table
  return <MaterialTable {...tableProps} />;
};

export default TableEmployeeComponent;
