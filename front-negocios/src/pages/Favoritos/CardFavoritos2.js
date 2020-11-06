import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import './Favoritos2.css'
import './CardFavoritos.css'

function CardFavoritos({ inEdit }, {empresa}) {

    const [removeCheck, setRemoveCheck] = useState(false);

    return (
        
        <Grid  item xs={6}  >
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }} />
            {inEdit && 
            <>
            <Checkbox
                onClick={()=>{setRemoveCheck(!removeCheck)}}
                checked={removeCheck}
                inputProps={{ 'aria-label': 'primary checkbox' }}/>
            </>
            }
            
            <img src="https://firebasestorage.googleapis.com/v0/b/empresas-tsp.appspot.com/o/perfil%2Ffruteria.jpg?alt=media&token=4a884e3f-8b41-43c8-bdff-f2ed7d74af57" alt="Amor"  />
            <div>
                <p className="favoritos_nombre"></p>
            </div>
        </Grid>
    )

}

export default CardFavoritos

