import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from './pages/Search';
import Select from './pages/Select';
import LifeGame from './pages/LifeGame'

export default function App() {
  return (
    <Router>
        <Switch>
          <Route component={LifeGame} path="/conway"></Route>
          <Route component={Search} path="/search"></Route>
          <Route component={Select} path="/"></Route>
        </Switch>
    </Router>
  );
}