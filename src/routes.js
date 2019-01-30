import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import JoinLogin from "./components/JoinLogin/JoinLogin";
import Dashboard from "./components/Dashboard/Dashboard";
import AddAdventure from "./components/AddAdventure/AddAdventure";
import Adventure from "./components/Adventure/Adventure";

export default (
     <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/sign-up" component={JoinLogin} />
          <Route path="/login" component={JoinLogin} />
          <Route path="/dash/list" component={Dashboard} />
          <Route path="/dash/calendar" component={Dashboard} />
          <Route path="/dash/map" component={Dashboard} />
          <Route path="/dash" component={Dashboard} />
          <Route path="/adventure/add" component={AddAdventure} />
          <Route path="/adventure/edit/:id" component={AddAdventure} />
          <Route path="/adventure/:id" component={Adventure} />
     </Switch>
);

