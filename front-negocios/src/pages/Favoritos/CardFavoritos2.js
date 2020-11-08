import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import './Favoritos2.css'
import './CardFavoritos.css'
import image from '../../images/imagen.png'
import { Link } from "react-router-dom";


function CardFavoritos({ inEdit, empresa, setListaAEliminar, listaAEliminar }) {

    const [removeCheck, setRemoveCheck] = useState(false);

    useEffect(() => {
        if (removeCheck) {
            const lista = listaAEliminar.slice();
            lista.push(empresa.id_empresa);
            setListaAEliminar(lista);
        } else {
            const lista = listaAEliminar.slice();
            lista.splice(lista.indexOf(empresa.id_empresa), 1);
            setListaAEliminar(lista);
        }
    }, [removeCheck])

    return (
        
            <Grid item xs={6}  >

                <>
                    <GridListTile>
                        <  Link to={"/empresa/ver/"+empresa.id_empresa}>
                        <div className="">
                            <img src={empresa.imagen || image} alt="" className="favorito_imagen" />
                        </div>
                        </Link>
                        <GridListTileBar
                            title={empresa.nombre}
                            subtitle={<span>direccion: {empresa.direccion}</span>}
                            actionIcon={inEdit &&
                                <>
                                    <Checkbox
                                        onClick={() => { setRemoveCheck(!removeCheck) }}
                                        checked={removeCheck}
                                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                                </>
                            }
                        />
                    </GridListTile>
                </>

            </Grid>
        
    )

}

export default CardFavoritos

