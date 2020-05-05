// React imports
import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { messages } from "../constants.js";

const { input, button } = messages;

const EmployeeForm = ({
  data,
  loading,
  submitAction,
  mutationEmployee,
  mutationSkillLink,
  defaultValues,
  title,
}) => {
  // Hooks
  const { handleSubmit, reset, control } = useForm({ defaultValues });

  // Props for return
  const buttonSubmitProps = {
    className: "button-submit",
    color: "primary",
    disabled: loading,
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

  // TODO: update to hooks, add subscription
  const renderSkillsMenu = (
    <Query query={gql(listSkills)}>
      {({ loading, data, error }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <p>{error.message}</p>;
        return (
          <FormSelect
            control={control}
            data={data || { listSkills: { items: [] } }}
          />
        );
      }}
    </Query>
  );

  return (
    <>
      <Title title={title} />
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            submitAction(data, mutationEmployee, mutationSkillLink, reset);
          })}
        >
          <FormInput {...firstNameProps} />
          <FormInput {...lastNameProps} />
          {renderSkillsMenu}
          <div>
            <FormButton {...buttonSubmitProps}>{button.submit}</FormButton>
          </div>
        </form>
      </div>
    </>
  );
};

EmployeeForm.propTypes = {
  mutationEmployee: PropTypes.object.isRequired,
  mutationSkillLink: PropTypes.object,
  loading: PropTypes.bool,
  submitAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default EmployeeForm;
