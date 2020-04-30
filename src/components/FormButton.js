// React imports
import React from "react";
// Material UI imports
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const FormButton = ({
  // Style
  size,
  variant,
  className,
  type,

  // Button children
  children,

  // Action
  onClick,
}) => {
  // Props for return
  const buttonProps = {
    variant,
    className: `${className} btn-${variant} btn-${size}`,
    size,
    type,
  };

  if (onClick) {
    buttonProps.onClick = onClick;
  }

  // JSX
  return (
    <Box m={1} display="inline">
      <Button {...buttonProps}>{children}</Button>
    </Box>
  );
};

export default FormButton;
