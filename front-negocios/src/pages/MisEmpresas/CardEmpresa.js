import React,{useEffect,useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import image from '../../images/imagen.png';
import Fab from '@material-ui/core/Fab';
import EditSharpIcon from '@material-ui/icons/EditSharp';

function CardEmpresa({inRemove, empresa,listaSeleccionada,setListaSeleccionada}) {

    const [check,setCheck] = useState(false);

    useEffect(() => {
        if(check){
            const lista = listaSeleccionada.slice();
            lista.push(empresa.id_empresa);
            setListaSeleccionada(lista);
        }else{
            const lista = listaSeleccionada.slice();
            lista.splice(lista.indexOf(empresa.id_empresa),1);
            setListaSeleccionada(lista);
        }
    }, [check])
  
    return (
        <>
        <Grid item xs={2} >
            
            <ListItemAvatar>
            <Avatar
               src={empresa.imagen||image}//Foto de la base.
            />
            </ListItemAvatar>
        </Grid>
        <Grid item xs={6}>
            <ListItemText primary={empresa.nombre} />   
        </Grid>
        <Grid item xs={2}>
        {inRemove && 
            <>
            <Checkbox
                onClick={()=>{setCheck(!check)}}
                checked={check}
                inputProps={{ 'aria-label': 'primary checkbox' }}/>
            </>
            }
        </Grid>
        <Grid item xs={2}>
            {!inRemove && 
            <EditSharpIcon color="inherit" onClick={()=>{window.location.href = `/empresa/modificar/${empresa.id_empresa}`;}}/>
            }
        </Grid>
        </>
        

    )
}

export default CardEmpresa
