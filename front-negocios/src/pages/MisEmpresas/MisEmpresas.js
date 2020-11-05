import React, { useState,useEffect } from 'react'
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
import CardEmpresa from  './CardEmpresa';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function MisEmpresas() {
  const classes = useStyles();
  const [inEdit, setInEdit] = useState(false)

  const handleCancel = () => {
    setInEdit();
  }

  return (
    <>
        <Titulo titulo="Mis Empresas" />
        <ListItem dense className={classes.root}>
            <Grid container md={12} spacing={3} justify="space-around" >
              <CardEmpresa inEdit={inEdit}></CardEmpresa>
              <CardEmpresa inEdit={inEdit}></CardEmpresa>
              <CardEmpresa inEdit={inEdit}></CardEmpresa>
              <CardEmpresa inEdit={inEdit}></CardEmpresa>
            </Grid>
        </ListItem>
        <Grid container justify="flex-end" spacing={2}>
          {inEdit && 
          <><Grid item>
              <Button variant="contained" color="inherit" onClick={handleCancel}>
                  Cancelar
              </Button>
            </Grid>
              <Grid item>
                  <Button variant="contained" color="secondary">
                      Modificar Empresa
                  </Button>
              </Grid>
              <Grid item>
                  <Button variant="contained" color="secondary">
                      Eliminar Empresa
                  </Button>
          </Grid></>}
          {!inEdit && <><Grid item>
              <Fab color="primary" aria-label="edit" onClick={() => { setInEdit(true) }}>
                  <EditSharpIcon color="inherit" />
              </Fab>
          </Grid></>}
        </Grid>
    </>
  );
}

export default MisEmpresas