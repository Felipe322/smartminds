import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {auth} from '../../firebase/firebase.js'
import axios from 'axios';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Proyecto Tonatiuh  
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//Estilos css
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Registrar({ruta}) {
  const classes = useStyles();
  const [correo,setCorreo] = useState('');
  const [contraseña,setContraseña] = useState('');
  const [usuario,setUsuario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(correo,contraseña)
    .catch((e) => alert(e.message))
    .then((e)=>
    {
      const user = {
        usuario,
        correo,
      }
  
      axios
        .post(ruta + "api/usuario/", user, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          console.log(response);
          alert(`Usuario ${usuario} creado`);
          window.location.href = "/login";
        })
        .catch((error) => {
          alert(error.response);
          window.location.href = "/";
        });
    }
    );


    
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="usuario"
                label="Nombre de usuario"
                name="usuario"
                autoComplete="usuario"
                value={usuario}
                onChange={(e)=>{setUsuario(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                value={correo}
                onChange={(e)=>{setCorreo(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={contraseña}
                onChange={(e)=>{setContraseña(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto términos y condiciones."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/empresa/login" variant="body2" to={`/empresa/login`} >
                ¿Ya tienes una cuenta? Ingresar
              </Link>

            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}