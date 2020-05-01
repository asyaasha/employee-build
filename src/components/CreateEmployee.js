// React imports
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
// Components
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
// Helpers
import messages from "../constants.js";
import { createRandomId } from "../util.js";
// GraphQL imports
import { Mutation } from "react-apollo";
import { createEmployee } from "../graphql/mutations";
import gql from "graphql-tag";

const { title, input, button, skillOptions } = messages;

export default function CreateEmployee() {
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

  const onSubmit = (data) => {
    //data.id = createRandomId();
    //event.preventDefault();
    setData(event.target.value);
    console.log("data");
    console.log(data);
    console.log("event");
    console.log(event);
    console.log(event.target);
  };

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

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="container">
        <FormInput {...firstNameProps} />
        <FormInput {...lastNameProps} />
        <FormSelect control={control} />
      </div>
      <FormButton {...buttonResetProps}>{button.reset}</FormButton>
      <FormButton {...buttonSubmitProps}>{button.submit}</FormButton>
    </form>
  );

  return (
    <>
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
                    id: createRandomId(),
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
                <FormButton {...buttonSubmitProps}>{button.submit}</FormButton>
              </form>
              {error && <p>{error.message}</p>}
            </div>
          );
        }}
      </Mutation>
    </>
  );
}
