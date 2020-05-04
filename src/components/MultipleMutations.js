import React from "react";
import { Mutation } from "react-apollo";
import Composer from "react-composer";
import PropTypes from "prop-types";

// Helper function to create multiple mutations
// ref https://github.com/apollographql/react-apollo/issues/1867
const MultipleMutations = ({ mutations, children }) => (
  <Composer
    components={mutations.map((mutation) => ({ render }) => (
      <Mutation {...mutation}>
        {(mutationFn, mutationState) =>
          render({
            execute: mutationFn,
            ...mutationState,
          })
        }
      </Mutation>
    ))}
  >
    {children}
  </Composer>
);

MultipleMutations.propTypes = {
  mutations: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired,
};

export default MultipleMutations;
