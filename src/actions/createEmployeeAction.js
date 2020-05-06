import React from "react";
import generateId from "../util.js";
import { employeeDefaultValues } from "../constants.js";
import createSkillUserAction from "./createSkillUserAction";

// Action to create a new employee and connections to skills
const createEmployeeAction = (data, createEmployee, createSkillUser, reset) => {
  const employeeId = generateId();
  createEmployee({
    variables: {
      input: {
        id: employeeId,
        firstname: data.firstname,
        lastname: data.lastname,
      },
    },
  })
    .then((res) => {
      const userID = res.data.createEmployee.id;
      let promises = createSkillUserAction(
        data.skills,
        employeeId,
        createSkillUser
      );

      Promise.all(promises)
        .then((results) => {
          // reset form to default values
          reset(employeeDefaultValues);
        })
        .catch((e) => {
          console.error(e);
        });
    })
    .catch((error) => console.log("error" + error));
};

export default createEmployeeAction;
