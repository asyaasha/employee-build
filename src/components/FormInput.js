import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";

const FormInput = ({ name, onChange, placeholder, inputType }) => {
  // Hooks
  const [inputValue, setInputValue] = useState("");

  // Business logic
  const handleChange = (event) => {
    setInputValue(event.target.value);

    if (onChange) onChange(name, inputValue);
  };

  // Props
  const boxProps = {
    m: 2,
    display: "flex",
  };
  const inputProps = {
    name,
    onChange: handleChange,
    placeholder,
    type: inputType,
    value: inputValue,
  };

  return (
    <Box {...boxProps}>
      <Input {...inputProps} />
    </Box>
  );
};

export default FormInput;
