import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import messages from "../constants.js";

// name messages
const { input } = messages;

// Constants
const HEIGHT = 48;
const PADDING_TOP = 8;

// Styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 140,
    maxWidth: 400,
    textTransform: "capitalize",
  },
}));
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: HEIGHT * 4.5 + PADDING_TOP,
      textTransform: "capitalize",
      width: 250,
    },
  },
};

const FormSelect = ({ control, data }) => {
  // Hooks
  const classes = useStyles();
  const [optionNames, setOptionNames] = useState([]);
  const { listSkills } = data;

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
            {listSkills.items.map((option) => {
              if (option) {
                return (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                );
              }
            })}
          </Select>
        }
        control={control}
        name="skills"
      />
    </FormControl>
  );
};

export default FormSelect;
