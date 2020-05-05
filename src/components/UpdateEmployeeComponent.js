// React imports
import React from "react";
// Components
import EmployeeForm from "./EmployeeForm";
// GraphQL imports
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getEmployee } from "../graphql/queries";
import {
  updateEmployee as updateEmployeeMutation,
  updateSkillUser as updateSkillUserMutation,
} from "../graphql/mutations";
import gql from "graphql-tag";
// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// Helpers
import { messages } from "../constants.js";
import { signInButton } from "aws-amplify";

const { title } = messages;

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 24,
    paddingTop: 18,
    paddingBottom: 34,
  },
}));

const UpdateEmployeeComponent = ({ match }) => {
  // Hooks
  const classes = useStyles();
  const { loading, data: dataEmployee } = useQuery(gql(getEmployee), {
    variables: {
      id: match.params.id,
    },
  });
  const [updateEmployee, { loading: updating, error }] = useMutation(
    gql(updateEmployeeMutation)
  );
  const [updateSkillUser] = useMutation(gql(updateSkillUserMutation));

  // TODO add action
  const updateEmployeeAction = (
    data,
    mutationEmployee,
    mutationSkillLink,
    reset
  ) => {
    console.log("updateEmployeeAction");
    console.log(data);
  };

  const renderEmployeeForm = () => {
    if (!loading && dataEmployee) {
      const {
        firstname,
        lastname,
        id,
        skills: { items },
      } = dataEmployee.getEmployee;
      const selectedEmployee = {
        id,
        firstname,
        lastname,
        skills: items.map((item) => item.skillID),
      };

      // Props
      const formProps = {
        defaultValues: selectedEmployee,
        loading,
        mutationEmployee: updateEmployee,
        mutationSkillLink: updateSkillUser,
        submitAction: updateEmployeeAction,
        title: title.updateEmployee,
      };

      return (
        <>
          <EmployeeForm {...formProps} />
          {error && <p>{error.message}</p>}
        </>
      );
    }
  };

  return (
    <Paper className={classes.root}>
      <Grid container display="row">
        <Grid item xs={3}>
          {renderEmployeeForm()}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Paper>
  );
};

export default UpdateEmployeeComponent;
