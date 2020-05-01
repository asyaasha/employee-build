// React imports
import React from "react";
import { Switch, Route } from "react-router-dom";
// Components
import CreateEmployee from "./CreateEmployee";
import TableEmployee from "./TableEmployee";
import Header from "./Header";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={TableEmployee} />
        <Route exact path="/create" component={CreateEmployee} />
      </Switch>
    </>
  );
};

export default App;
