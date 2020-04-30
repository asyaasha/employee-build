import React from "react";
import Button from "@material-ui/core/Button";

const FormButton = ({ size, variant, className, children }) => {
  const buttonProps = {
    variant,
    className: `btn-${variant} btn-${size}`,
    size,
  };

  return <Button {...buttonProps}>{children}</Button>;
};

export default FormButton;
