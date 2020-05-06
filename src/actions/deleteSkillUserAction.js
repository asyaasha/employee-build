// Action to delete a connection between user and a skill
const deleteSkillUserAction = (skills, deleteSkillUser) => {
  const graphqlRemoveSkillLink = (linkID) => {
    return new Promise((resolve, reject) => {
      resolve(
        deleteSkillUser({
          variables: {
            input: {
              id: linkID,
            },
          },
        })
      );
    });
  };
  // Remove connections to an employee from all skills
  let promises = skills.map((skill) => {
    return graphqlRemoveSkillLink(skill.id).then((e) => {
      return e;
    });
  });

  return promises;
};

export default deleteSkillUserAction;
