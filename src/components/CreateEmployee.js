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
import { generateId } from "../util.js";

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
    data.id = generateId();
    setData(data);
    console.log(data);
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
      {renderForm}
    </>
  );
}
