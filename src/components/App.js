// React imports
import React from "react";
import { Switch, Route } from "react-router-dom";
// Components
import CreateEmployee from "./CreateEmployee";
import TableEmployee from "./TableEmployee";
import Header from "./Header";
import Box from "@material-ui/core/Box";

const App = () => {
  return (
    <>
      <Header />
      <Box m={3}>
        <Switch>
          <Route exact path="/" component={TableEmployee} />
          <Route exact path="/create" component={CreateEmployee} />
        </Switch>
      </Box>
    </>
  );
};

export default App;
