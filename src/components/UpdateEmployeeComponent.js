// React imports
import React from "react";
// Components
import EmployeeForm from "./EmployeeForm";
// GraphQL imports
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getEmployee } from "../graphql/queries";
import {
  updateEmployee as updateEmployeeMutation,
  createSkillUser as createSkillUserMutation,
  deleteSkillUser as deleteSkillUserMutation,
} from "../graphql/mutations";
import gql from "graphql-tag";
// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
// Actions
import { updateEmployeeAction } from "../actions";

// Helpers
import { messages } from "../constants.js";

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

const UpdateEmployeeComponent = ({ match }) => {
  // Hooks
  const classes = useStyles();
  const { loading, data: dataEmployee } = useQuery(gql(getEmployee), {
    variables: {
      id: match.params.id,
    },
  });
  const [updateEmployee, { loading: updating, error }] = useMutation(
    gql(updateEmployeeMutation),
    {
      update(cache, { data: { updateEmployee } }) {
        cache.writeQuery({
          query: gql(getEmployee),
          data: { getEmployee: updateEmployee },
        });
      },
    }
  );
  const [deleteSkillUser] = useMutation(gql(deleteSkillUserMutation));
  const [createSkillUser] = useMutation(gql(createSkillUserMutation));

  // Business logic
  const onSubmit = (data, reset) => {
    const {
      id,
      skills: { items: prevSkills },
    } = dataEmployee.getEmployee;
    // add existing id to new data object
    data.id = id;

    updateEmployeeAction(
      // data
      prevSkills,
      data,
      // mutations
      updateEmployee,
      createSkillUser,
      deleteSkillUser
    );
  };

  const renderEmployeeForm = () => {
    if (!loading && dataEmployee && !updating) {
      const {
        firstname,
        lastname,
        skills: { items },
      } = dataEmployee.getEmployee;

      const selectedEmployee = {
        firstname,
        lastname,
        skills: items.map((item) => item.skillID),
      };

      // Props
      const formProps = {
        defaultValues: selectedEmployee,
        loading: updating || loading,
        submitAction: onSubmit,
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
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}> {renderEmployeeForm()}</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateEmployeeComponent;
