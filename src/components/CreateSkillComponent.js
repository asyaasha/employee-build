// React imports
import React from "react";
import { useForm } from "react-hook-form";
// Components
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import Title from "./Title";
// GraphQL imports
import { Mutation } from "react-apollo";
import { createSkill } from "../graphql/mutations";
import gql from "graphql-tag";
// Actions
import createSkillAction from "../actions/createSkillAction";
// Helpers
import { messages, skillDefaultValues } from "../constants.js";

const { title, input, button } = messages;

const CreateSkillComponent = () => {
  // Hooks
  const { handleSubmit, reset, control } = useForm({ skillDefaultValues });

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
      <Mutation mutation={gql(createSkill)}>
        {(createSkill, { data, loading, error }) => {
          return (
            <div>
              <form
                onSubmit={handleSubmit((data) => {
                  createSkillAction(data, createSkill, reset);
                })}
              >
                <FormInput {...nameProps} />
                <div>
                  <FormButton {...buttonSubmitProps} disabled={loading}>
                    {button.submit}
                  </FormButton>
                </div>
              </form>
              {error && <p>{error.message}</p>}
            </div>
          );
        }}
      </Mutation>
    </>
  );
};

export default CreateSkillComponent;
