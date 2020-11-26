import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

function Comentario({comentario,userAuth,ruta,id}) {

    const handleEliminar = () => {
        console.log(comentario);
        let objeto = {
            "id_comentario": comentario.id_comentario,
            "correo": userAuth.email,
        }

        axios.post(ruta + 'api/comentrio/eliminar/', objeto, (res) => {
            console.log(res);
        }).then(()=>{
            window.location.href = "/empresa/ver/" + id;
        });

        
    }

    return (
        <Grid container className="container__comentario">
            <Grid item xs={6}>
                <Typography variant="title" color="textPrimary">
                    {comentario.usuario}:
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="subtitle" color="textSecondary">
                    {comentario.contenido}
                    
                </Typography>
            </Grid>
            <Grid item xs={1}>
                {(userAuth && userAuth.email===comentario.email) &&<DeleteIcon onClick={handleEliminar}></DeleteIcon>}  
            </Grid>
        </Grid >
    )
}

export default Comentario
