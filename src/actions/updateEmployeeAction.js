import { createSkillUserAction, deleteSkillUserAction } from "../actions";

// Action to update employees data, remove connections for removed skills
// And create new connections for added skills
const updateEmployeeAction = (
  // data
  prevSkills,
  newData,
  // Mutations
  updateEmployee,
  createSkillUser,
  deleteSkillUser
) => {
  const {
    id,
    firstname: newFirstname,
    lastname: newLastname,
    skills: newSkills,
  } = newData;
  const skillsToRemove = prevSkills.filter(
    (skill) => !newSkills.includes(skill)
  );
  const skillsToCreate = newSkills.filter(
    (skill) => !prevSkills.includes(skill)
  );

  let createPromises = createSkillUserAction(
    skillsToCreate,
    id,
    createSkillUser
  );
  let deletePromises = deleteSkillUserAction(skillsToRemove, deleteSkillUser);

  Promise.all(createPromises.concat(deletePromises))
    .then((results) => {
      // Update employee in the db
      updateEmployee({
        variables: {
          input: {
            id,
            firstname: newFirstname,
            lastname: newLastname,
          },
        },
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

export default updateEmployeeAction;
