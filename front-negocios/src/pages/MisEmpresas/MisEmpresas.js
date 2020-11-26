
import React, { useState, useEffect, useContext, useCallback } from 'react'
import ListItem from '@material-ui/core/ListItem';
import Titulo from "../../components/Titulo";
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";
import CardEmpresa from './CardEmpresa';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import DeleteIcon from '@material-ui/icons/Delete';
import './MisEmpresas.css'

function MisEmpresas({ ruta }) {
  //variables de estado
  const { userAuth } = useContext(UserContext);
  const [inRemove, setInRemove] = useState(false);
  const [listaMisEmpresas, setListaMisEmpresas] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState([]);

  //funciones y callbacks
  const handleCancel = () => {
    setInRemove();
  }
  const recargarMisEmpresas = useCallback(() => {
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
    
  },[ruta,userAuth]);

  const handleEliminar = () => {
    let data = {
      lista: listaSeleccionada,
      correo: userAuth.email
    }

    axios.post(ruta + "api/mis_empresas/eliminar_lista/", data, {
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((result) => {
      console.log(result);
      recargarMisEmpresas();
    }).catch((e) => {
      console.log(e);
      alert('Error no se pudo borrar la empresa');
    })
    
  }

  //Use Effects
  useEffect(() => {
    recargarMisEmpresas();
  }, [recargarMisEmpresas])

  

  //render
  return (
    <>
      <Titulo titulo="Mis Empresas" />
      
        <Grid container md={12} spacing={0} justify="space-around">
          {listaMisEmpresas.map((empresa) =>
          <ListItem dense className="misempresas__item" key={empresa.id_empresa}>
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