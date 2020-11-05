import React,{useEffect,useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';


function CardEmpresa({inEdit}) {

    const [removeCheck,setRemoveCheck] = useState(false);

    return (

        <Grid item xs={10} >
            
            <ListItemAvatar>
            <Avatar
                src="https://firebasestorage.googleapis.com/v0/b/empresas-tsp.appspot.com/o/perfil%2Ffruteria.jpg?alt=media&token=4a884e3f-8b41-43c8-bdff-f2ed7d74af57"//Foto de la base.
            />
            </ListItemAvatar>
            <ListItemText primary={'Mi Empresa'} />
            {inEdit && 
            <>
            <Checkbox
                onClick={()=>{setRemoveCheck(!removeCheck)}}
                checked={removeCheck}
                inputProps={{ 'aria-label': 'primary checkbox' }}/>
            </>
            }
        </Grid>

    )
}

export default CardEmpresa
