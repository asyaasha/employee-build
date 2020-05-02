// React imports
import React, { useState, useEffect } from "react";
// Components
import SkillForm from "./SkillForm";
import EmployeeForm from "./EmployeeForm";
import Title from "./Title";
// GraphQL imports
import { Mutation } from "react-apollo";
import { createEmployee } from "../graphql/mutations";
import gql from "graphql-tag";
// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// Helpers
import messages from "../constants.js";
import generateId from "../util.js";

const { title } = messages;
const useStyles = makeStyles((theme) => ({
  root: { paddingLeft: 24, paddingTop: 18, paddingBottom: 34 },
}));

const CreateEmployee = () => {
  // Initial form values
  const defaultValues = {
    id: null,
    firstname: "",
    lastname: "",
    skills: [],
  };

  // Hooks
  const [data, setData] = useState(null);
  const classes = useStyles();

  const createAction = (createEmployee) => {
    console.log("data");
    console.log(data);
    // createEmployee({
    //   variables: {
    //     input: {
    //       id: generateId(),
    //       firstname: data.firstname,
    //       lastname: data.lastname,
    //       skills: () => {
    //         // add skills
    //       },
    //     },
    //   },
    // }).then((res) => {
    //   // reset values
    //   console.log("res");
    //   alert(JSON.stringify(res.data));
    // });
  };

  return (
    <Paper className={classes.root}>
      <Grid container display="row">
        <Grid item xs={3}>
          <Mutation mutation={gql(createEmployee)}>
            {(createEmployee, { data, loading, error }) => {
              const formProps = {
                data: data,
                loading: loading,
                title: title.createEmployee,
                actionType: createEmployee,
                submitAction: createAction,
              };

              return (
                <>
                  <EmployeeForm {...formProps} />
                  {error && <p>{error.message}</p>}
                </>
              );
            }}
          </Mutation>
        </Grid>
        <Grid item xs={3}>
          <SkillForm />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateEmployee;
