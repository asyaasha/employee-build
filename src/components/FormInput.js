// React imports
import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
// Material UI imports
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";

const FormInput = ({ control, name, placeholder }) => {
  // Props for return
  const boxProps = {
    display: "flex",
    m: 2,
  };
  const controllerProps = {
    as: <TextField placeholder={placeholder} required />,
    control,
    name,
  };

  return (
    <Box {...boxProps}>
      <FormControl required={true}>
        <Controller {...controllerProps} />
      </FormControl>
    </Box>
  );
};

FormInput.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormInput;
