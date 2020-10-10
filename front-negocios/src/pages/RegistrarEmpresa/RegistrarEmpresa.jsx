import React from "react";
import Titulo from "../../components/Titulo";
import Avatar from "@material-ui/core/Avatar/Avatar";
import TextField from "@material-ui/core/TextField/TextField";


function RegistrarEmpresa() {
  return (
    <div>
      <Titulo titulo="Registrar Empresa" />
      <div>
        <form noValidate autoComplete="off">
          <Avatar>H</Avatar>

          {/*Foto Principal    
                Nombre Empresa*/}
          <TextField id="standard-basic" label="Nombre de la empresa" />
          <TextField id="standard-basic" label="Descripción" />
          <TextField id="standard-basic" label="Teléfono" />
          <TextField id="standard-basic" label="Email de la empresa" />
          <TextField id="standard-basic" label="Teléfono" />

          
          {/*Descripcion
                Telefono
                Email
                Categoria
                Horarios
                Fotos Galeria
                */}
        </form>
      </div>
    </div>
  );
}

export default RegistrarEmpresa;
