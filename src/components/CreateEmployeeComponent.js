// React imports
import React from "react";
// Components
import CreateSkillComponent from "./CreateSkillComponent";
import EmployeeForm from "./EmployeeForm";
// GraphQL imports
import { useMutation } from "@apollo/react-hooks";
import {
  createEmployee as createEmployeeMutation,
  createSkillUser as createSkillUserMutation,
} from "../graphql/mutations";
import gql from "graphql-tag";
// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import createEmployeeAction from "../actions/createEmployeeAction";

// Helpers
import { messages, employeeDefaultValues } from "../constants.js";

const { title } = messages;

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 24,
    paddingTop: 18,
    paddingBottom: 34,
  },
}));

const CreateEmployeeComponent = () => {
  // Hooks
  const classes = useStyles();
  const [createEmployee, { data, loading, error }] = useMutation(
    gql(createEmployeeMutation)
  );
  const [createSkillUser] = useMutation(gql(createSkillUserMutation));

  const renderEmployeeForm = () => {
    // Props
    const formProps = {
      data,
      defaultValues: employeeDefaultValues,
      loading,
      mutationEmployee: createEmployee,
      mutationSkillLink: createSkillUser,
      submitAction: createEmployeeAction,
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
    <Paper className={classes.root}>
      <Grid container display="row">
        <Grid item xs={3}>
          {renderEmployeeForm()}
        </Grid>
        <Grid item xs={3}>
          <CreateSkillComponent />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateEmployeeComponent;
