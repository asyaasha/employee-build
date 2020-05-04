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
          skillID
          userID
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
          skillID
          userID
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
          skillID
          userID
        }
        nextToken
      }
    }
  }
`;
export const onCreateSkillUser = /* GraphQL */ `
  subscription OnCreateSkillUser {
    onCreateSkillUser {
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
export const onUpdateSkillUser = /* GraphQL */ `
  subscription OnUpdateSkillUser {
    onUpdateSkillUser {
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
export const onDeleteSkillUser = /* GraphQL */ `
  subscription OnDeleteSkillUser {
    onDeleteSkillUser {
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
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill {
    onCreateSkill {
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
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill {
    onUpdateSkill {
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
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill {
    onDeleteSkill {
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
