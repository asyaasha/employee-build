// React imports
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// Components
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import Title from "./Title";

// GraphQL imports
import { Mutation } from "react-apollo";
import { createSkill } from "../graphql/mutations";
import gql from "graphql-tag";

// Helpers
import messages from "../constants.js";
import generateId from "../util.js";

const { title, input, button, skillOptions } = messages;

const SkillForm = () => {
  // Initial form values
  const defaultValues = {
    id: null,
    name: "",
  };
  // Hooks
  const { handleSubmit, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);

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
                  setData(data);
                  createSkill({
                    variables: {
                      input: {
                        id: generateId(),
                        name: data.name.toLowerCase(),
                      },
                    },
                  }).then((res) => {
                    // reset values
                    console.log("created");
                    console.log(JSON.stringify(res.data.createSkill.id));
                  });
                })}
                className="form"
              >
                <div className="container">
                  <FormInput {...nameProps} />
                </div>
                <FormButton {...buttonSubmitProps}>{button.submit}</FormButton>
              </form>
              {error && <p>{error.message}</p>}
            </div>
          );
        }}
      </Mutation>
    </>
  );
};

export default SkillForm;
