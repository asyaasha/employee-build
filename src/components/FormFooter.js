import React from "react";
import FormButton from "./FormButton";

import { messages } from "../constants.js";

const FormFooter = ({ history, loading }) => {
  const buttonSubmitProps = {
    className: "button-submit",
    color: "primary",
    disabled: loading,
    size: "small",
    type: "submit",
    variant: "outlined",
  };
  const buttonHomeProps = {
    className: "button-home",
    color: "default",
    disabled: loading,
    size: "small",
    onClick: () => history.push("/"),
    variant: "outlined",
  };

  return (
    <div>
      <FormButton {...buttonSubmitProps}>{messages.button.submit}</FormButton>
      <FormButton {...buttonHomeProps}>{messages.button.home}</FormButton>
    </div>
  );
};

export default FormFooter;
