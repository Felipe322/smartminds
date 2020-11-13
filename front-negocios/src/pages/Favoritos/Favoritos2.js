import React, { useCallback } from 'react';
import GridList from '@material-ui/core/GridList';
import { useEffect, useState,useContext } from 'react'
import CardFavoritos2 from './CardFavoritos2';
import Fab from '@material-ui/core/Fab';
import { Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import './Favoritos2.css';
import Titulo from '../../components/Titulo';
import axios from 'axios';
import UserContext from "../../context/UserContext";



export default function TitlebarGridList({ruta}) {
  //variables de estado
  const { userAuth } = useContext(UserContext);
  const [inEdit, setInEdit] = useState(false);
  const [listaEmpresas,setListaEmpresas] = useState([]);
  const [listaFavoritos,setListaFavoritos] = useState([]);
  const [listaAEliminar,setListaAEliminar] = useState([]);


  //funciones y callbacks
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

  const recargarFavoritos = useCallback(() => {
    if (userAuth) {
      axios.get(ruta + "api/favoritos/" + userAuth.email).then((res) => {
        setListaFavoritos(res.data);
      });
    } 
  },[ruta,userAuth]);

  //useEffects
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
  },[ruta])

  useEffect(() => {
    recargarFavoritos();
  }, [userAuth,recargarFavoritos]);

  
  

  //render
  return (
    
    <div className='cards'>
      <Titulo titulo="Empresas Favoritas"></Titulo>
      {!userAuth &&
      <a href="/login"><center className="ref_login">Login</center></a>
      }
      <GridList cellHeight={180} className='prueba'>
          {listaEmpresas.filter((empresa)=>listaFavoritos.indexOf(empresa.id_empresa)>=0).map((empresa)=>
            <CardFavoritos2 key={empresa.id_empresa} inEdit={inEdit} empresa={empresa} setListaAEliminar={setListaAEliminar} listaAEliminar={listaAEliminar}/>
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
