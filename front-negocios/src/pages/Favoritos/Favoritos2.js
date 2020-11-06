import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState } from 'react'
import CardFavoritos2 from './CardFavoritos2';
import Fab from '@material-ui/core/Fab';
import { Button, Container } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import './Favoritos2.css'
import Titulo from '../../components/Titulo';

/** 
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList() {

  const [inEdit, setInEdit] = useState(false)

  const handleCancel = () => {
    setInEdit();
  }
  
  const [removeCheck, setRemoveCheck] = useState(false);
  return (
    <div className='cards' >
      <Titulo titulo="Empresas Favoritas"></Titulo>
      <GridList cellHeight={180} className='prueba'>
          
          <CardFavoritos2 className='prueba' inEdit={inEdit} />
          <CardFavoritos2 inEdit={inEdit} />
          <CardFavoritos2 inEdit={inEdit} />
          <CardFavoritos2 inEdit={inEdit} />
          <CardFavoritos2 inEdit={inEdit} />
          <CardFavoritos2 inEdit={inEdit} />
          <CardFavoritos2 inEdit={inEdit} />


      </GridList>

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
        {!inEdit && <><GridListTile item>
          <Fab color="primary" aria-label="edit" onClick={() => { setInEdit(true) }}>
            <EditSharpIcon color="inherit" />


          </Fab>
        </GridListTile></>}

      </Grid>



    </div>
  );
}
