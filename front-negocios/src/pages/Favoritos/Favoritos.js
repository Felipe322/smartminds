import { Button, Container } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import Titulo from '../../components/Titulo';
import Grid from "@material-ui/core/Grid";
import './Favoritos.css'
import EditSharpIcon from '@material-ui/icons/EditSharp';
import CardFavoritos from './CardFavoritos';
import Fab from '@material-ui/core/Fab';


function Favoritos() {
    const [inEdit, setInEdit] = useState(false)
    

    const handleCancel = () => {
        setInEdit();
    }

    return (
        <>
            <Titulo titulo="Empresas Favoritas"></Titulo>
            <Container className="contenedor_favoritos">
                <Grid container spacing={1} justify="space-around">
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                    <CardFavoritos inEdit={inEdit} />
                </Grid>


                <Grid container justify="flex-end" className="boton__eliminar" spacing={2}>
                    {inEdit && 
                    <><Grid item>
                        <Button variant="contained" color="inherit" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary">
                                Quitar de favoritos
                            </Button>
                    </Grid></>}
                    {!inEdit && <><Grid item>
                        <Fab color="primary" aria-label="edit" onClick={() => { setInEdit(true) }}>
                            <EditSharpIcon color="inherit" />
                        </Fab>
                    </Grid></>}

                </Grid>


            </Container>

        </>
    )
}

export default Favoritos
