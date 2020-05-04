/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      firstname
      lastname
      skills {
        items {
          id
          skillID
          userID
        }
        nextToken
      }
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      firstname
      lastname
      skills {
        items {
          id
          skillID
          userID
        }
        nextToken
      }
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      firstname
      lastname
      skills {
        items {
          id
          skillID
          userID
        }
        nextToken
      }
    }
  }
`;
export const createSkillUser = /* GraphQL */ `
  mutation CreateSkillUser(
    $input: CreateSkillUserInput!
    $condition: ModelSkillUserConditionInput
  ) {
    createSkillUser(input: $input, condition: $condition) {
      id
      skillID
      userID
      skill {
        id
        name
        employees {
          nextToken
        }
      }
      user {
        id
        firstname
        lastname
        skills {
          nextToken
        }
      }
    }
  }
`;
export const updateSkillUser = /* GraphQL */ `
  mutation UpdateSkillUser(
    $input: UpdateSkillUserInput!
    $condition: ModelSkillUserConditionInput
  ) {
    updateSkillUser(input: $input, condition: $condition) {
      id
      skillID
      userID
      skill {
        id
        name
        employees {
          nextToken
        }
      }
      user {
        id
        firstname
        lastname
        skills {
          nextToken
        }
      }
    }
  }
`;
export const deleteSkillUser = /* GraphQL */ `
  mutation DeleteSkillUser(
    $input: DeleteSkillUserInput!
    $condition: ModelSkillUserConditionInput
  ) {
    deleteSkillUser(input: $input, condition: $condition) {
      id
      skillID
      userID
      skill {
        id
        name
        employees {
          nextToken
        }
      }
      user {
        id
        firstname
        lastname
        skills {
          nextToken
        }
      }
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $input: CreateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    createSkill(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          skillID
          userID
        }
        nextToken
      }
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill(
    $input: UpdateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    updateSkill(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          skillID
          userID
        }
        nextToken
      }
    }
  }
`;
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill(
    $input: DeleteSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    deleteSkill(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          skillID
          userID
        }
        nextToken
      }
    }
  }
`;
