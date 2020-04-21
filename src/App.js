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
          <Route component={Search} path="/pokemon_find"></Route>
          <Route component={Select} path="/pokemon_cal"></Route>
        </Switch>
    </Router>
  );
}