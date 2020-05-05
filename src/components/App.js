// React imports
import React from "react";
import { Switch, Route } from "react-router-dom";
// Components
import CreateEmployeeComponent from "./CreateEmployeeComponent";
import UpdateEmployeeComponent from "./UpdateEmployeeComponent";
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
          <Route exact path="/update/:id" component={UpdateEmployeeComponent} />
        </Switch>
      </Box>
    </>
  );
};

export default App;
