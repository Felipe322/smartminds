import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState,useContext } from 'react'
import CardFavoritos2 from './CardFavoritos2';
import Fab from '@material-ui/core/Fab';
import { Button, Container } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import './Favoritos2.css';
import Titulo from '../../components/Titulo';
import axios from 'axios';
import UserContext from "../../context/UserContext";



export default function TitlebarGridList({ruta}) {
  const { userAuth } = useContext(UserContext);
  const [inEdit, setInEdit] = useState(false);
  const [listaEmpresas,setListaEmpresas] = useState([]);
  const [listaFavoritos,setListaFavoritos] = useState([]);
  const [listaAEliminar,setListaAEliminar] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(ruta + "api/empresa/")
        .then((res) => {
          setListaEmpresas(res.data);
        })
        .catch((error) => {

          alert(error);
        });
    }
    fetchData();
  },[])

  useEffect(() => {
    recargarFavoritos();
  }, [userAuth]);

  const recargarFavoritos = () => {
    if (userAuth) {
      axios.get(ruta + "api/favoritos/" + userAuth.email).then((res) => {
        setListaFavoritos(res.data);
      });
    } 
  };
  

  const handleCancel = () => {
    setInEdit();
  }

  const quitarFavoritosHandler = () =>{
    let data = {
      lista:listaAEliminar,
      correo:userAuth.email
    }
    axios.post(ruta + "api/favorito/eliminar_lista/", data, {
      headers: { "Access-Control-Allow-Origin": "*" },
      }).then((result)=>{
      }).catch((e)=>{
      })
    recargarFavoritos();
  }

  return (
    
    <div className='cards'>
      <Titulo titulo="Empresas Favoritas"></Titulo>
      {!userAuth &&
      <a href="/login"><center className="ref_login">Login</center></a>
      }
      <GridList cellHeight={180} className='prueba'>
          {listaEmpresas.filter((empresa)=>listaFavoritos.indexOf(empresa.id_empresa)>=0).map((empresa)=>
            <CardFavoritos2 inEdit={inEdit} empresa={empresa} setListaAEliminar={setListaAEliminar} listaAEliminar={listaAEliminar}/>
          )}

      </GridList>

      <Grid container justify="flex-end" className="boton__eliminar" spacing={1} direction="row">
        {inEdit &&
          <><Grid item xs={6}>
            <Button variant="contained" color="inherit" onClick={handleCancel}>
              Cancelar
            </Button>
          </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" onClick={quitarFavoritosHandler}>
                Quitar de favoritos
              </Button>
            </Grid></>}
        {(!inEdit && userAuth) && <>
          <Fab color="primary" aria-label="edit" onClick={() => { setInEdit(true) }}>
            <EditSharpIcon color="inherit" />
          </Fab>
        </>}

      </Grid>



    </div>
  );
}
