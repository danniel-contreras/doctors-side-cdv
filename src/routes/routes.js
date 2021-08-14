import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Quote from "../pages/Quote";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/quote/:id" component={Quote} exact />
      </Switch>
    </Router>
  );
}
