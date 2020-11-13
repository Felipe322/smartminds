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
import Login from './pages/Login/Login';
import Favoritos2 from './pages/Favoritos/Favoritos2';
import Buscar from './pages/Buscar/Buscar';
import MisEmpresas from './pages/MisEmpresas/MisEmpresas';
import BarraNavegacion from '../src/pages/Inicio/BarraNavegacion' ;
import RegistroUsuario from './pages/RegisrarUsuario/RegistroUsuario';
import ModificarEmpresa from './pages/ModificarEmpresa/ModificarEmpresa';


require('dotenv').config()


const rutaAPI = process.env.API || 'http://localhost:5000/'


function App() {

  return (
    
      <Router>
        <div className="App">
          <Switch>
            <Route path="/empresa/crear" >
              <RegistarEmpresa ruta={rutaAPI} />
            </Route>
            <Route path="/empresa/ver/:id">
              <DescripcionEmpresa ruta={rutaAPI} />
            </Route>
            <Route exact path="/">
              <Inicio ruta={rutaAPI} />
            </Route>
            <Route exact path="/login">
              <Login ruta={rutaAPI}></Login>
            </Route>          
            <Route path="/favoritos2">
              <Favoritos2 ruta={rutaAPI}/> 
            </Route>
            <Route path="/buscar">
              <Buscar ruta={rutaAPI} />
            </Route>
            <Route exact path="/usuario/crear">
              <RegistroUsuario ruta={rutaAPI}></RegistroUsuario>
            </Route>
            <Route exact path="/empresa/MisEmpresas">
              <MisEmpresas ruta={rutaAPI}></MisEmpresas>
            </Route>
            <Route exact path="/empresa/modificar/:id">
              <ModificarEmpresa ruta={rutaAPI}/>
            </Route>
          </Switch>
        </div>
        <BarraNavegacion></BarraNavegacion>
      </Router>
  );
}

export default App;