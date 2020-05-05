import generateId from "../util.js";
import { employeeDefaultValues } from "../constants.js";

// Action to create a new employee and a connection to skill
const createEmployeeAction = (data, createEmployee, createLink, reset) => {
  const employeeId = generateId();
  createEmployee
    .execute({
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

      const graphqlCreateSkillLink = (skillID) => {
        return new Promise((resolve, reject) => {
          resolve(
            createLink.execute({
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
      let promises = data.skills.map((skill) => {
        return graphqlCreateSkillLink(skill).then((e) => {
          console.log(e);
          return e;
        });
      });
      Promise.all(promises)
        .then((results) => {
          // reset form to default
          reset(employeeDefaultValues);
        })
        .catch((e) => {
          console.error(e);
        });
    })
    .catch((error) => console.log("error" + error));
};

export default createEmployeeAction;
