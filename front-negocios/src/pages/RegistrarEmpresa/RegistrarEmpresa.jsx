import React, { useState } from "react";
import Titulo from "../../components/Titulo";
import TextField from "@material-ui/core/TextField/TextField";
import Container from "@material-ui/core/Container";
import InputTelefono from "../../components/forms/InputTelefono";
import CheckCategoria from "../../components/forms/CheckCategoria";
import InputHorarios from "../../components/forms/InputHorarios";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import "./RegistrarEmpresa.css";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from 'axios';

////Vista
function RegistrarEmpresa() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion,setDireccion] = useState("")
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
  //const [pathImage,setPathImage] = useState();
  const [diasSemana] = useState(['Lu','Ma','Mi','Ju','Vi','Sa','Do']);

  
  const handleChange = (event) => {
    setImagen(URL.createObjectURL(event.target.files[0]));
    //setPathImage(event.target.files[0]);
  };

  const convertirTelefono = (telefono) => {
    if(telefono===undefined){
      return 'xxxxxxxxxx';
    }else{
      return telefono
    .replace('-','')
    .replace('(','')
    .replace(')','')
    .replace(' ','');
    }
    
  }

  const horarioFormateado = () => {
    let horario = horaAbrir+"-"+horaCerrar+". "
    diasSemana.forEach((dia)=>{
      dias.forEach((diaSeleccionado)=>{
        if(diaSeleccionado.indexOf(dia)!==-1){
          horario+=dia +" ";
        }
      });
    })
    return horario;

  }


  const handleSubmit = async(e) => {
    e.preventDefault();

    alert(horarioFormateado());    

    const empresa = {
      nombre,
      direccion,
      email,
      telefono: convertirTelefono(telefono),
      descripcion,
      horario: horarioFormateado(),
    }
    alert('HOla mUndo');

    axios.post('http://localhost:5000/api/empresa/',empresa,
    {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(response => { 
      console.log(response)
    })
    .catch(error => {
        alert(error.response)
    });
    window.location.href = '/';
  }


  return (
    <div>
      <Titulo titulo="Registrar Empresa" />
      <Container maxWidth="md">
        <form noValidate autoComplete="off"  enctype="multipart/form-data"  onSubmit={handleSubmit}>
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
            <img src={imagen} alt=""/>
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
          /><br/><br/>
          {/*Direccion*/}
          <TextField
            id="standard-basic"
            label="Direccion"
            value={direccion}
            onChange={(e) => {
              setDireccion(e.target.value);
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
          <Button variant="contained" color="primary" type="submit" endIcon={<Send></Send>}>
            Registrar empresa
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default RegistrarEmpresa;
