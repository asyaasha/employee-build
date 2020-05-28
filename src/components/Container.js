// React imports
import React from "react";
// GraphQL imports
import { listEmployees, listSkills } from "../graphql/queries";
import {
  createEmployee as createEmployeeMutation,
  updateEmployee as updateEmployeeMutation,
  createSkillUser as createSkillUserMutation,
  createSkill as createSkillMutation,
} from "../graphql/mutations";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function MutationsContainer({ children }) {
  const [createEmployee, createResult] = useMutation(
    gql(createEmployeeMutation)
  );

  const [updateEmployee, updateResult] = useMutation(
    gql(updateEmployeeMutation),
    {
      update: (cache, { data: { updateEmployee } }) => {
        cache.writeQuery({
          query: gql(getEmployee),
          data: { getEmployee: updateEmployee },
        });
      },
    }
  );

  const [createSkillUser, createSkillUserResult] = useMutation(
    gql(createSkillUserMutation)
  );

  return children({
    createEmployee: { mutation: createEmployee, result: createResult },
    createSkillUser: {
      mutation: createSkillUser,
      result: createSkillUserResult,
    },
    updateEmployee: { mutation: updateEmployee, result: updateResult },
  });
}
