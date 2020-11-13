import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

function Comentario({usuario,contenido}) {
    return (
        <Grid container className="container__comentario">
            <Grid item xs={6}>
                <Typography variant="title" color="textPrimary">
                    {usuario}:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle" color="textSecondary">
                    {contenido}
                </Typography>
            </Grid>
        </Grid >
    )
}

export default Comentario
