import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";

import messages from "../constants.js";
import data from "../mock.js";

const { title, input } = messages;

// Styles
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const TableEmployee = () => {
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
              {rowData.skills.map((skill) => {
                return (
                  <Chip
                    key={skill.id}
                    label={skill.name}
                    className={classes.chip}
                  />
                );
              })}
            </div>
          );
        },
      },
    ],
    data: data.employees,
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

  return <MaterialTable {...tableProps} />;
};

export default TableEmployee;
