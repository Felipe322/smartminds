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
require('dotenv').config()

const rutaAPI = process.env.API||'http://localhost:5000/'

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/empresa/crear" >
              <RegistarEmpresa ruta={rutaAPI}/>
            </Route>
            <Route path="/empresa/ver/:id">
              <DescripcionEmpresa ruta={rutaAPI}/>
            </Route>
            <Route exact path="/">
              <Inicio ruta={rutaAPI}/>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
