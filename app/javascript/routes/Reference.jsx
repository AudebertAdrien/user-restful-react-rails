import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Users from "../components/Users"
import User from "../components/User"
import NewUser from "../components/NewUser"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={Users} />
      <Route path="/user/:id" exact component={User} />
      <Route path="/users/create" exact component={NewUser} />
    </Switch>
  </Router>
);