import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Titulo from "../../components/Titulo";
import { Button, Container } from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Fab from '@material-ui/core/Fab';
import CardFavoritos from '../Favoritos/CardFavoritos';
import Grid from "@material-ui/core/Grid";
import CardEmpresa from './CardEmpresa';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import DeleteIcon from '@material-ui/icons/Delete';
import './MisEmpresas.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function MisEmpresas({ ruta }) {
  const classes = useStyles();
  const { userAuth } = useContext(UserContext);
  const [inRemove, setInRemove] = useState(false);
  const [inEdit,setInEdit] = useState(false);
  const [listaMisEmpresas, setListaMisEmpresas] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState([]);

  useEffect(() => {
    recargarMisEmpresas();
  }, [userAuth])

  const handleCancel = () => {
    setInRemove();
  }

  const recargarMisEmpresas = () => {
    if (userAuth) {
      axios
        .get(ruta + `api/empresa-usuario/${userAuth.email}`)
        .then((res) => {
          console.log(res.data)
          setListaMisEmpresas(res.data);
        })
        .catch(e => {
          console.log(e);
        });

    }
  }

  const handleEliminar = () => {
    alert('hola');
    let data = {
      lista: listaSeleccionada,
      correo: userAuth.email
    }

    axios.post(ruta + "api/mis_empresas/eliminar_lista/", data, {
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((result) => {
      console.log(result);
    }).catch((e) => {
      console.log(e);
    })
    recargarMisEmpresas();
  }

  return (
    <>
      <Titulo titulo="Mis Empresas" />
      
        <Grid container md={12} spacing={0} justify="space-around">
          {listaMisEmpresas.map((empresa) =>
          <ListItem dense className="misempresas__item">
            <CardEmpresa inRemove={inRemove} empresa={empresa} listaSeleccionada={listaSeleccionada} setListaSeleccionada={setListaSeleccionada}></CardEmpresa>
            </ListItem>
          )}
        </Grid>
      
      <Grid container justify="flex-end" spacing={1} className="boton__eliminar">
        {inRemove &&
          <>
            <Grid item>
              < Button variant="contained" color="inherit" onClick={handleCancel}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleEliminar}>
                Eliminar Empresa
              </Button>
            </Grid>
          </>
        }
        {!inRemove && <><Grid item>
          <Fab color="primary" aria-label="edit" onClick={() => { setInRemove(true) }}>
            <DeleteIcon color="inherit" />
          </Fab>
        </Grid></>}
      </Grid>
    </>
  );
}

export default MisEmpresas