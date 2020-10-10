import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import RegistarEmpresa from './pages/RegistrarEmpresa/RegistrarEmpresa'
import Inicio from './pages/Inicio/Inicio';
import DescripcionEmpresa from './pages/DescripcionEmpresa/DescripcionEmpresa';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/empresa/crear">
            <RegistarEmpresa />
          </Route>
          <Route path="/empresa/ver/:id">
            <DescripcionEmpresa/>
          </Route>
          <Route exact path="/">
            <Inicio/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
