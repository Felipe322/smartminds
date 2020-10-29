import { Container } from '@material-ui/core';
import React from 'react'
import Titulo from '../../components/Titulo';
import BarraNavegacion from "../Inicio/BarraNavegacion.js";
import Grid from "@material-ui/core/Grid";

function Favoritos() {
    return (
        <>
            <Titulo titulo="Empresas Favoritas"></Titulo>
            <Grid container>
                <Grid item><img src="https://firebasestorage.googleapis.com/v0/b/empresas-tsp.appspot.com/o/perfil%2Ffruteria.jpg?alt=media&token=4a884e3f-8b41-43c8-bdff-f2ed7d74af57" alt=""/></Grid>
            </Grid>
            <BarraNavegacion></BarraNavegacion>
        </>
    )
}

export default Favoritos
