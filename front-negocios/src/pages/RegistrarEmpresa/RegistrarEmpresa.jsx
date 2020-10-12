import React, { useState } from "react";
import Titulo from "../../components/Titulo";
import TextField from "@material-ui/core/TextField/TextField";
import Container from "@material-ui/core/Container";
import InputTelefono from "../../components/forms/InputTelefono";
import CheckCategoria from "../../components/forms/CheckCategoria";
import InputHorarios from "../../components/forms/InputHorarios";
//import InputImage from "../../components/forms/InputImage";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import "./RegistrarEmpresa.css";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

////Vista
function RegistrarEmpresa() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState();
  const [email, setEmail] = useState();
  const [categorias, setCategorias] = useState([]);
  const [listaCategorias] = useState([
    "Comida",
    "Servicios",
    "Carros",
    "Ferreterias",
  ]);
  const [dias, setDias] = useState([]);
  const [horaAbrir, setHoraAbrir] = useState("07:30");
  const [horaCerrar, setHoraCerrar] = useState("18:30");
  const [imagen, setImagen] = useState();

  const handleChange = (event) => {
    setImagen(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <Titulo titulo="Registrar Empresa" />
      <Container maxWidth="md">
        <form noValidate autoComplete="off">
          {/*Avatar*/}
          <div className="avatarContainer">
            <label for="upload-photo">
              <PhotoCamera />
            </label>
            <input
              type="file"
              name="photo"
              id="upload-photo"
              onChange={handleChange}
            />
          </div>
          <div className="imageContainer">
            <img src={imagen}/>
          </div>
          {/*Nombre de la empresa */}
          <TextField
            id="standard-basic"
            label="Nombre de la empresa"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            fullWidth
          />
          <br />
          <br />
          {/*Descripcion empresa */}
          <TextField
            id="standard-multiline-flexible"
            label="Descripcion empresa"
            multiline
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
            rowsMax={4}
            fullWidth
          />
          <br />
          <br />
          {/*Telefono */}
          <InputTelefono setTelefono={setTelefono} telefono={telefono} />
          <br />
          <br />
          {/*Email empresa */}
          <TextField
            id="standard-basic"
            label="Email de la empresa"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
          />
          <br />
          <br />
          {/*Categoria*/}
          <CheckCategoria
            setCategorias={setCategorias}
            categorias={categorias}
            listaCategorias={listaCategorias}
          />
          <br />
          {/*Horarios*/}
          <InputHorarios
            dias={dias}
            setDias={setDias}
            horaAbrir={horaAbrir}
            horaCerrar={horaCerrar}
            setHoraCerrar={setHoraCerrar}
            setHoraAbrir={setHoraAbrir}
          />
          <br />
          <br />
          {/*Image Upload*/}
          {/*<InputImage></InputImage>*/}
          <br />
          {/*Registrar empresa */}
          <Button variant="contained" color="primary" endIcon={<Send></Send>}>
            Registrar empresa
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default RegistrarEmpresa;
