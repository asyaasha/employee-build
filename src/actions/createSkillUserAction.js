import generateId from "../util.js";

// Action to create connectios between a user and skills
// Returns promisses
const createSkillUserAction = (skills, userID, createSkillUser) => {
  const graphqlCreateSkillLink = (skillID) => {
    return new Promise((resolve, reject) => {
      resolve(
        createSkillUser({
          variables: {
            input: {
              id: generateId(),
              userID,
              skillID,
            },
          },
        })
      );
    });
  };

  // Create connections to an employee for all selected skills
  return skills.map((skill) => {
    return graphqlCreateSkillLink(skill).then((e) => {
      console.log(e);
      return e;
    });
  });
};

export default createSkillUserAction;
