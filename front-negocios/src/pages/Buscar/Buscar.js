import React from 'react'
import Titulo from '../../components/Titulo';
import BarraNavegacion from "../Inicio/BarraNavegacion.js";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));


function Buscar() {
    const classes = useStyles();
    return (
        <div>
            <Titulo titulo="Buscar Empresa"></Titulo>
            <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                </IconButton>
                <InputBase className={classes.input} placeholder="Busca alguna empresa"/>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
            </Paper>
            <BarraNavegacion></BarraNavegacion>
        </div>

    )
}


export default Buscar