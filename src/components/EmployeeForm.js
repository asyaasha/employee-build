// React imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// Components
import FormSelect from "./FormSelect";
import FormFooter from "./FormFooter";
import FormInput from "./FormInput";
import Title from "./Title";
// GraphQL imports
import { useQuery } from "@apollo/react-hooks";
import { listSkills } from "../graphql/queries";
import gql from "graphql-tag";
// Helpers
import { messages } from "../constants.js";

const { input, form } = messages;

const EmployeeForm = ({ loading, submitAction, defaultValues, title }) => {
  // Hooks
  const { handleSubmit, reset, control } = useForm({ defaultValues });
  const { loading: loadingSkills, data: dataSkills, error } = useQuery(
    gql(listSkills)
  );
  let history = useHistory();

  // Props for return
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

  const renderSkillsMenu = () => {
    if (loadingSkills) return <p>{form.loading}</p>;
    if (error) return <p>{error.message}</p>;

    const FormSelectProps = {
      data: dataSkills,
      defaultSkills: defaultValues.skills,
      control: control,
    };

    return <FormSelect {...FormSelectProps} />;
  };

  const renderFormInputs = () => {
    if (loading) return <p>{form.loading}</p>;

    return (
      <>
        <FormInput {...firstNameProps} />
        <FormInput {...lastNameProps} />
        {renderSkillsMenu()}
      </>
    );
  };

  return (
    <>
      <Title title={title} />
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            submitAction(data, reset);
          })}
        >
          {renderFormInputs()}
          <FormFooter history={history} loading={loading} />
        </form>
      </div>
    </>
  );
};

EmployeeForm.propTypes = {
  loading: PropTypes.bool,
  submitAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default EmployeeForm;
