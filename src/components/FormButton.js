// React imports
import React from "react";
import PropTypes from "prop-types";
// Material UI imports
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const FormButton = ({
  disabled,
  // Style
  className,
  size,
  type,
  variant,
  // Button children
  children,
  // Action
  onClick,
}) => {
  // Props for return
  const buttonProps = {
    disabled,
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

FormButton.propTypes = {
  disabled: PropTypes.bool,
  // Style
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  // Button children
  children: PropTypes.string,
  // Action
  onClick: PropTypes.func,
};
FormButton.defaultProps = {
  disabled: false,
};

export default FormButton;
