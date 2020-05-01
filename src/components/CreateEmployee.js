// React imports
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
// Components
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
// GraphQL imports
import { Mutation } from "react-apollo";
import { createEmployee, createSkill } from "../graphql/mutations";
import gql from "graphql-tag";
// Material UI
import Grid from "@material-ui/core/Grid";
// Helpers
import messages from "../constants.js";
import generateId from "../util.js";

const { title, input, button, skillOptions } = messages;

const CreateSkill = () => {
  // Initial form values
  const defaultValues = {
    id: null,
    name: "",
  };
  // Hooks
  const { handleSubmit, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);

  // Props for return
  const buttonSubmitProps = {
    size: "small",
    type: "submit",
    variant: "contained",
    className: "button-submit",
  };
  const nameProps = {
    control,
    name: "name",
    placeholder: input.skillName,
  };

  return (
    <>
      <h2>{title.createSkill}</h2>
      <Mutation mutation={gql(createSkill)}>
        {(createSkill, { data, loading, error }) => {
          return (
            <div>
              <form
                onSubmit={handleSubmit((data) => {
                  setData(data);
                  createSkill({
                    variables: {
                      input: {
                        id: generateId(),
                        name: data.name.toLowerCase(),
                      },
                    },
                  }).then((res) => {
                    // reset values
                    console.log("created");
                    console.log(JSON.stringify(res.data.createSkill.id));
                  });
                })}
                className="form"
              >
                <div className="container">
                  <FormInput {...nameProps} />
                </div>
                <FormButton {...buttonSubmitProps}>{button.submit}</FormButton>
              </form>
              {error && <p>{error.message}</p>}
            </div>
          );
        }}
      </Mutation>
    </>
  );
};

const CreateEmployee = () => {
  // Initial form values
  const defaultValues = {
    id: null,
    firstname: "",
    lastname: "",
    skills: [],
  };

  // Hooks
  const { handleSubmit, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);

  // Props for return
  const buttonResetProps = {
    size: "small",
    variant: "contained",
    onClick: () => {
      reset(defaultValues);
    },
  };
  const buttonSubmitProps = {
    size: "small",
    type: "submit",
    variant: "contained",
    className: "button-submit",
  };
  const firstNameProps = {
    control,
    name: "firstname",
    placeholder: input.firstName,
  };
  const lastNameProps = {
    control,
    name: "lastname",
    placeholder: input.lastName,
  };

  return (
    <Grid container display="row">
      <Grid item xs={3}>
        <h2>{title.createEmployee}</h2>
        <Mutation mutation={gql(createEmployee)}>
          {(createEmployee, { data, loading, error }) => {
            return (
              <div>
                <form
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    setData(data);
                    createSkill({
                      id: generateId(),
                      name: data.skills[0],
                    }).then((res) => {
                      // reset values
                      console.log("res");
                      alert(JSON.stringify(res.data));
                      // createEmployee({
                      //   variables: {
                      //     input: {
                      //       id: createRandomId(),
                      //       firstname: data.firstname,
                      //       lastname: data.lastname,
                      //       skills: {
                      //         items: {
                      //           id: createRandomId(),
                      //           name: data.skills[0],
                      //         },
                      //         items: {
                      //           id: createRandomId(),
                      //           name: data.skills[1],
                      //         },
                      //       },
                      //     },
                      //   },
                      // }).then((res) => {
                      //   // reset values
                      //   console.log("res");
                      //   alert(JSON.stringify(res.data));
                      // });
                    });
                  })}
                  className="form"
                >
                  <div className="container">
                    <FormInput {...firstNameProps} />
                    <FormInput {...lastNameProps} />
                    <FormSelect control={control} />
                  </div>
                  <FormButton {...buttonResetProps}>{button.reset}</FormButton>
                  <FormButton {...buttonSubmitProps}>
                    {button.submit}
                  </FormButton>
                </form>
                {error && <p>{error.message}</p>}
              </div>
            );
          }}
        </Mutation>
      </Grid>
      <Grid item xs={3}>
        <CreateSkill />
      </Grid>
    </Grid>
  );
};

export default CreateEmployee;
