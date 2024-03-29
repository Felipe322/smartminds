import React, { useEffect, useState,useContext } from 'react'
import Titulo from '../../components/Titulo';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Tarjeta from "../Inicio/Tarjeta";
import Container from "@material-ui/core/Container";
import './Buscar.css'
import ContextUser from "../../context/UserContext";
import { useCallback } from 'react';


function Buscar({ ruta }) {
  //variables de estado.
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const { userAuth } = useContext(ContextUser);
  const [listaFavoritos, setListaFavoritos] = useState([]);

  //funciones y callbacks
  const recargarFavoritos = useCallback(() => {
    if (userAuth) {
      axios.get(ruta + "api/favoritos/" + userAuth.email).then((res) => {
        setListaFavoritos(res.data);
      });
    }
  },[ruta,userAuth]);

  //use effects
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
  }, [filtro,ruta]);

  useEffect(() => {
    recargarFavoritos();
  }, [userAuth,recargarFavoritos]);


  //render
  return (
    <>
      <Titulo titulo="Buscar Empresa"></Titulo>
      <Container>
        <Grid container>
        <Grid item md={2} className="buscar__container">
            <Paper component="form" className="buscar">
              <IconButton className="buscarIconButton" aria-label="menu"/>
              
              <InputBase className="buscarInput" placeholder="Buscar" value={filtro} onChange={(e) => { setFiltro(e.target.value) }} />
              <IconButton type="submit" className="buscarIconButton" aria-label="search">
                <SearchIcon />
              </IconButton>  
            </Paper>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-around">
          
          {listaEmpresas.map((empresa) => (
            <Grid item md={4} key={empresa.id_empresa}>
                <Tarjeta empresa={empresa} 
                ruta={ruta} 
                recargarFavoritos={recargarFavoritos}
                favorito={listaFavoritos.indexOf(empresa.id_empresa) >= 0}
                listaFavoritos={listaFavoritos}
                setListaFavoritos={setListaFavoritos}
                >Empresa</Tarjeta>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>

  )
}


export default Buscar