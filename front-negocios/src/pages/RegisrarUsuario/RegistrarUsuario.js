import React, {useState} from 'react'
import Titulo from '../../components/Titulo';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";
import {auth} from '../../firebase/firebase.js'
function RegistrarUsuario({ ruta }) {
    
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [loading,setLoading] = useState(false);



    const handleSubmit = (e) => {
      e.preventDefault();
      auth.createUserWithEmailAndPassword(correo,contraseña)
      .catch((e) => alert(e.message));
    }
    
    ////////Vista/////////////////////////////////////////////////
    return (
        <div>
            <Titulo titulo="Registrar Usuario"></Titulo> 
            {/*Nombre de Usuario*/}
            <TextField
            id="standard-basic"
            label="Nombre de usuario"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            fullWidth
            required={true}
            />

         {/*Correo*/}
          <TextField
            id="standard-basic"
            label="Correo"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
            }}
            fullWidth
          />

            {/*Contraseña*/}
            <TextField
            id="standard-basic"
            label="Contraseña"
            value={contraseña}
            type="password"
            onChange={(e) => {
              setContraseña(e.target.value);
            }}
            fullWidth
          />

            
           {/*Registrar usuario */}
           
           <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Send></Send>}
            disabled={loading}
            onClick={handleSubmit}
          >{loading &&
            <CircularProgress size={20}></CircularProgress>}
            Registrar usuario
          </Button>
          

        </div>
    )
}

export default RegistrarUsuario
