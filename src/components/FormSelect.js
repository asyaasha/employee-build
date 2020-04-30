import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import messages from "../constants.js";

// name messages
const { input, skillOptions } = messages;

// Constants
const HEIGHT = 48;
const PADDING_TOP = 8;

// Styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 140,
    maxWidth: 400,
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: HEIGHT * 4.5 + PADDING_TOP,
      width: 250,
    },
  },
};

const FormSelect = ({ control }) => {
  // Hooks
  const classes = useStyles();
  const [optionNames, setOptionNames] = useState([]);

  // Business logic
  const handleChange = (event) => {
    setOptionNames(event.target.value);
  };

  // Props for return
  const selectProps = {
    value: optionNames,
    onChange: handleChange,
    input: <Input />,
    MenuProps: MenuProps,
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{input.skills}</InputLabel>
      <Controller
        as={
          <Select {...selectProps} multiple>
            {skillOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        }
        name="skills"
        control={control}
      />
    </FormControl>
  );
};

export default FormSelect;
