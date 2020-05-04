// React imports
import React from "react";
// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
// GraphQL imports
import { Query } from "react-apollo";
import { listEmployees } from "../graphql/queries";
import gql from "graphql-tag";
// Helpers
import { messages } from "../constants.js";
import data from "../mock.js";

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
                    console.log(item);
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
        console.log(JSON.stringify(rowData));
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
      onRowDelete: (oldData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
          }, 600);
        }),
    },
    title: title.employeesTable,
  };

  return (
    <>
      <Query query={gql(listEmployees)}>
        {({ loading, data, error }) => {
          if (loading) return <p>{form.loading}</p>;
          if (error) return <p>{error.message}</p>;
          tableProps.data = data.listEmployees.items;

          return <MaterialTable {...tableProps} />;
        }}
      </Query>
    </>
  );
};

export default TableEmployeeComponent;