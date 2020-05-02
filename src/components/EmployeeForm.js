// React imports
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// Components
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import Title from "./Title";
// GraphQL imports
import { Query } from "react-apollo";
import { listSkills } from "../graphql/queries";
import gql from "graphql-tag";
// Helpers
import messages from "../constants.js";
import generateId from "../util.js";

const { input, button } = messages;

const EmployeeForm = ({ data, loading, submitAction, actionType, title }) => {
  // Initial form values
  const defaultValues = {
    id: null,
    firstname: "",
    lastname: "",
    skills: [],
  };

  // Hooks
  const { handleSubmit, reset, control } = useForm({ defaultValues });

  // Props for return
  const buttonResetProps = {
    color: "secondary",
    size: "small",
    variant: "outlined",
    onClick: () => {
      reset(defaultValues);
    },
  };
  const buttonSubmitProps = {
    className: "button-submit",
    color: "primary",
    size: "small",
    type: "submit",
    variant: "outlined",
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

  const renderSkillsMenu = (
    <Query query={gql(listSkills)}>
      {({ loading, data, error }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <p>{error.message}</p>;
        return <FormSelect control={control} data={data} />;
      }}
    </Query>
  );

  return (
    <>
      <Title title={title} />
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            //submitAction(actionType);
            // reset values
            console.log("res");
            alert(JSON.stringify(data));
          })}
        >
          <FormInput {...firstNameProps} />
          <FormInput {...lastNameProps} />
          {renderSkillsMenu}
          <FormButton {...buttonSubmitProps}>{button.submit}</FormButton>
          <FormButton {...buttonResetProps}>{button.reset}</FormButton>
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
