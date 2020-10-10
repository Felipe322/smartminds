import { Button } from '@material-ui/core'
import React from 'react'
import Titulo from '../../components/Titulo'
import './Inicio.css'

function Inicio() {
    return (
        <div>
            <Titulo titulo="Inicio"/>
            <div className="contenedorBoton">
                <Button variant="contained" color="primary" className="boton">
                Primary
                </Button>
            </div>
        </div>
    )
}

export default Inicio
