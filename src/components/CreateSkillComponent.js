// React imports
import React from "react";
import { useForm } from "react-hook-form";
// Components
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import Title from "./Title";
// GraphQL imports
import { useMutation } from "@apollo/react-hooks";
import { createSkill as createSkillMutation } from "../graphql/mutations";
import gql from "graphql-tag";
// Actions
import createSkillAction from "../actions/createSkillAction";
// Helpers
import { messages, skillDefaultValues } from "../constants.js";

const { title, input, button } = messages;

const CreateSkillComponent = () => {
  // Hooks
  const { handleSubmit, reset, control } = useForm({ skillDefaultValues });
  const [createSkill, { loading: creating, error }] = useMutation(
    gql(createSkillMutation)
  );

  // Props for return
  const buttonSubmitProps = {
    className: "button-submit",
    color: "primary",
    size: "small",
    type: "submit",
    variant: "outlined",
  };
  const nameProps = {
    control,
    name: "name",
    placeholder: input.skillName,
  };

  return (
    <>
      <Title title={title.createSkill} />
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            createSkillAction(data, createSkill, reset);
          })}
        >
          <FormInput {...nameProps} />
          <div>
            <FormButton {...buttonSubmitProps} disabled={creating}>
              {button.submit}
            </FormButton>
          </div>
        </form>
        {error && <p>{error.message}</p>}
      </div>
    </>
  );
};

export default CreateSkillComponent;
