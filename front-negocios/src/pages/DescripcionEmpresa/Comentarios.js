import { Container, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid'
import ListaComentarios from './ListaComentarios';
import './Comentarios.css'
import UserContext from "../../context/UserContext";
import axios from 'axios';
import { useParams } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

function Comentarios({ ruta }) {
    const { id } = useParams();
    const classes = useStyles();
    const { userAuth } = useContext(UserContext);
    const [contenidoComentario, setContenidoComentario] = useState();


    const handleSendComment = (e) => {
        if(contenidoComentario!==undefined ){
            let comentario = {
                "correo": userAuth.email,
                "id_empresa": id,
                "comentario": contenidoComentario
            }
    
            axios.post(ruta + "api/comentario/", comentario).then((res) => {
                console.log(res);
                window.location.href = "/empresa/ver/" + id;
            }).catch((e) => {
                console.log(e);
                alert('No se pudo agregar el comentario.');
                window.location.href = "/empresa/ver/" + id;
            });
        }else{
            alert('Escribe texto en el comentario.');
        }
        

        

    }

    return (
        <Container >
            <Grid container alignContent="center" spacing={0}>
                <Grid item xs={12}>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        fullWidth
                        multiline
                        value={contenidoComentario}
                        onChange={(e) => { setContenidoComentario(e.target.value) }}
                        endAdornment={
                            userAuth!==null &&
                            (
                                <SendIcon color="primary" onClick={handleSendComment}>userAuth</SendIcon>
                            )
                        }
                        required={true}
                        placeholder="¿Qué te parece este negocio?"
                    />

                </Grid>
                
            </Grid>
            <Grid container className="contenedor__comentarios">
                <Grid item xs={12}>
                    <Typography variant="subtitle" color="primary">Comentarios:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ListaComentarios id={id} ruta={ruta} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Comentarios
