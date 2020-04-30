/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee {
    onCreateEmployee {
      id
      firstname
      lastname
      skills {
        items {
          id
          name
        }
        nextToken
      }
    }
  }
`;
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee {
    onUpdateEmployee {
      id
      firstname
      lastname
      skills {
        items {
          id
          name
        }
        nextToken
      }
    }
  }
`;
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee {
    onDeleteEmployee {
      id
      firstname
      lastname
      skills {
        items {
          id
          name
        }
        nextToken
      }
    }
  }
`;
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill {
    onCreateSkill {
      id
      name
      employee {
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
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill {
    onUpdateSkill {
      id
      name
      employee {
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
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill {
    onDeleteSkill {
      id
      name
      employee {
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
