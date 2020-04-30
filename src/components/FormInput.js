// React imports
import React, { useState } from "react";
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
    as: <TextField placeholder={placeholder} />,
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

export default FormInput;
