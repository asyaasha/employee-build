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
import { useQuery } from "@apollo/react-hooks";
import { listSkills } from "../graphql/queries";
import gql from "graphql-tag";
// Helpers
import { messages } from "../constants.js";

const { input, button, form } = messages;

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
  const { loading: loadingSkills, data: dataSkills, error } = useQuery(
    gql(listSkills)
  );

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

  // TODO: add subscription
  const renderSkillsMenu = () => {
    if (loadingSkills) return <p>{form.loading}</p>;
    if (error) return <p>{error.message}</p>;

    return <FormSelect control={control} data={dataSkills} />;
  };

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
          {renderSkillsMenu()}
          <div>
            <FormButton {...buttonSubmitProps}>{button.submit}</FormButton>
          </div>
        </form>
      </div>
    </>
  );
};

EmployeeForm.propTypes = {
  mutationEmployee: PropTypes.func.isRequired,
  mutationSkillLink: PropTypes.func,
  loading: PropTypes.bool,
  submitAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default EmployeeForm;
