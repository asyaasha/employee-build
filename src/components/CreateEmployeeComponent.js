// React imports
import React from "react";
// Components
import CreateSkillComponent from "./CreateSkillComponent";
import EmployeeForm from "./EmployeeForm";
// GraphQL imports
import { useMutation } from "@apollo/react-hooks";
import { listEmployees } from "../graphql/queries";
import {
  createEmployee as createEmployeeMutation,
  createSkillUser as createSkillUserMutation,
} from "../graphql/mutations";
import gql from "graphql-tag";
// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
// Action
import { createEmployeeAction } from "../actions";

// Helpers
import { messages, employeeDefaultValues } from "../constants.js";

const { title } = messages;

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "start",
    color: theme.palette.text.secondary,
  },
}));

const CreateEmployeeComponent = () => {
  // Hooks
  const classes = useStyles();
  const [createEmployee, { loading, error }] = useMutation(
    gql(createEmployeeMutation),
    {
      update(cache, { data: { createEmployee } }) {
        const data = cache.readQuery({
          query: gql(listEmployees),
        });
        const { items } = data.listEmployees;

        cache.writeQuery({
          query: gql(listEmployees),
          data: {
            listEmployees: {
              ...data.listEmployees,
              items: items.concat([createEmployee]),
            },
          },
        });
      },
    }
  );
  const [createSkillUser] = useMutation(gql(createSkillUserMutation));

  // Buisness logic
  const onSubmit = (data, reset) => {
    createEmployeeAction(data, createEmployee, createSkillUser, reset);
  };

  const renderEmployeeForm = () => {
    // Props
    const formProps = {
      defaultValues: employeeDefaultValues,
      loading,
      submitAction: onSubmit,
      title: title.createEmployee,
    };

    return (
      <>
        <EmployeeForm {...formProps} />
        {error && <p>{error.message}</p>}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}> {renderEmployeeForm()}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {" "}
            <CreateSkillComponent />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateEmployeeComponent;
