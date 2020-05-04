// React imports
import React from "react";
import { Switch, Route } from "react-router-dom";
// Components
import CreateEmployeeComponent from "./CreateEmployeeComponent";
import TableEmployeeComponent from "./TableEmployeeComponent";
import Header from "./Header";
import Box from "@material-ui/core/Box";

const App = () => {
  return (
    <>
      <Header />
      <Box m={3}>
        <Switch>
          <Route exact path="/" component={TableEmployeeComponent} />
          <Route exact path="/create" component={CreateEmployeeComponent} />
        </Switch>
      </Box>
    </>
  );
};

export default App;
