import { skillDefaultValues } from "../constants.js";

// Action to create a new skill
const createSkillAction = (data, createSkill, reset) => {
  const name = data.name.toLowerCase();
  createSkill({
    variables: {
      input: {
        id: name,
        name,
      },
    },
  }).then((res) => {
    // reset form values to default
    reset(skillDefaultValues);
  });
};

export default createSkillAction;
