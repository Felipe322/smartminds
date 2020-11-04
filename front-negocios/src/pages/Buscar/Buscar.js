import React, { useEffect, useState } from 'react'
import Titulo from '../../components/Titulo';
import BarraNavegacion from "../Inicio/BarraNavegacion.js";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Tarjeta from "../Inicio/Tarjeta";
import Container from "@material-ui/core/Container";
import './Buscar.css'


function Buscar({ ruta }) {
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    //petición
    let filter = {
      "filter": filtro
    };

    axios
      .post(ruta + "api/empresa/filtrar/", filter, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        console.log(response)
        setListaEmpresas(response.data)

      })
      .catch((error) => {
        alert(error.response);
      });
  }, [filtro]);


  return (
    <div>
      <Titulo titulo="Buscar Empresa"></Titulo>
      <Container>
        <Grid container>
        <Grid item md={2}>
            <Paper component="form" className="buscar">
              <IconButton className="buscarIconButton" aria-label="menu"/>
              
              <InputBase className="buscarInput" placeholder="Buscar" value={filtro} onChange={(e) => { setFiltro(e.target.value) }} />
              <IconButton type="submit" className="buscarIconButton" aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider className="buscarDivider" orientation="vertical" />
            </Paper>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-around">
          
          {listaEmpresas.map((empresa) => (
            <Grid item md={4}>
              <Link to={`/empresa/ver/` + empresa.id_empresa}>
                <Tarjeta empresa={empresa}>Empresa</Tarjeta>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>

  )
}


export default Buscar