import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { messages } from "../constants.js";

const { title, input, button } = messages;

const CreateEmployee = () => {
  // Business logic
  const handleInputChange = (name, value) => {
    console.log(name);
    console.log(value);
  };

  // Props
  const firstNameProps = {
    name: "firstname",
    placeholder: input.firstName,
  };
  const lastNameProps = {
    name: "lastname",
    placeholder: input.lastName,
  };
  const inputProps = {
    onChange: handleInputChange,
    type: "text",
  };
  const buttonProps = {
    size: "small",
    variant: "contained",
  };

  return (
    <div>
      <h1>{title.createEmployee}</h1>
      <form>
        <FormInput {...inputProps} {...firstNameProps} />
        <FormInput {...inputProps} {...lastNameProps} />
        <FormButton {...buttonProps}>{button.submit}</FormButton>
      </form>
    </div>
  );
};

export default CreateEmployee;
