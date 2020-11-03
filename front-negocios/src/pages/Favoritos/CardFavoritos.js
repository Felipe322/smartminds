import React,{useEffect,useState} from 'react'
import Grid from "@material-ui/core/Grid";
import './CardFavoritos.css'
import Checkbox from '@material-ui/core/Checkbox';

function CardFavoritos({inEdit}) {

    const [removeCheck,setRemoveCheck] = useState(false);

    return (

        <Grid item xs={4} className="contenedor__itemFavoritos">
            {inEdit && 
            <>
            <Checkbox
                onClick={()=>{setRemoveCheck(!removeCheck)}}
                checked={removeCheck}
                inputProps={{ 'aria-label': 'primary checkbox' }}/>
            </>
            }
            
            <img src="https://firebasestorage.googleapis.com/v0/b/empresas-tsp.appspot.com/o/perfil%2Ffruteria.jpg?alt=media&token=4a884e3f-8b41-43c8-bdff-f2ed7d74af57" alt="" />
            <div>
                <p className="favoritos_nombre">Nombre de mi empresa</p>
            </div>
        </Grid>

    )
}

export default CardFavoritos
