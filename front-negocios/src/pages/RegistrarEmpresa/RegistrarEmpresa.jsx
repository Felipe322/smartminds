import React, { useState,useEffect } from "react";
import { storage } from "../../firebase/firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import axios from "axios";


function RegistrarEmpresa({ ruta }) {
  //////////////////////////////////STATE////////////////////////////////////////////////////////////////////
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
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
  const [pathImage, setPathImage] = useState("");
  const [diasSemana] = useState(["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"]);
  const [loading,setLoading] = useState(false);
  const [buttonDisabled,setButtonDisabled] = useState(false);


  ////////Use Effect//////////////////
  useEffect(() => {
  }, [loading]);
  /////////////////////////////////////Funciones//////////////////////////////////////////////////////
  const handleChange = (event) => {
    setImagen(URL.createObjectURL(event.target.files[0]));
    setPathImage(event.target.files[0]);
  };

  const convertirTelefono = (telefono) => {
    if (telefono === undefined) {
      return "";
    } else {
      return telefono
        .replace("-", "")
        .replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .trim();
    }
  };

  const horarioFormateado = () => {
    let horario = horaAbrir + "-" + horaCerrar + ". ";
    diasSemana.forEach((dia) => {
      dias.forEach((diaSeleccionado) => {
        if (diaSeleccionado.indexOf(dia) !== -1) {
          horario += dia + " ";
        }
      });
    });
    return horario;
  };

  const uploadImage = async () => {
    const uploadTask = storage.ref(`perfil/${pathImage.name}`).put(pathImage);
    let urlImagen = "";

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          resolve("sin imagen");
        },
        () => {
          storage
            .ref("perfil")
            .child(pathImage.name)
            .getDownloadURL()
            .then((url) => {
              resolve(url);
            });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    let telefonoFormateado = convertirTelefono(telefono);
    if (
      telefonoFormateado.localeCompare("") === 0 ||
      telefonoFormateado.length < 10
    ) {
      alert("Introduce un numero de telefono de 10 digitos");
      setLoading(false);
      return;  
    }
    let urlImagen = "";
    if (pathImage !== "") {
      urlImagen = await uploadImage();
    }

    const empresa = {
      nombre,
      direccion,
      email,
      telefono: convertirTelefono(telefono),
      descripcion,
      horario: horarioFormateado(),
      imagen: urlImagen,
    };

    axios
      .post(ruta + "api/empresa/", empresa, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.response);
        window.location.href = "/";
      });
  };

  ////////////////////////////////////////////////Vista/////////////////////////////////////////////////////////////
  return (
    <div>
      <Titulo titulo="Registrar Empresa" />
      <Container maxWidth="md">        
        <form
          autoComplete="off"
          enctype="multipart/form-data"
          onSubmit={handleSubmit}
        >          
          
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
            <img src={imagen} alt="" />
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
            required={true}
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
            required={true}
          />
          <br />
          <br />
          {/*Direccion*/}
          <TextField
            id="standard-basic"
            label="Direccion"
            value={direccion}
            onChange={(e) => {
              setDireccion(e.target.value);
            }}
            fullWidth
            required={true}
          />
          <br />
          <br />

          {/*Telefono */}
          <InputTelefono
            setTelefono={setTelefono}
            telefono={telefono}
            required={true}
          />
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Send></Send>}
            disabled={loading}
          >{loading &&
            <CircularProgress size={20}></CircularProgress>}
            Registrar empresa
          </Button>
      
        </form>
      </Container>
    </div>
  );
}

export default RegistrarEmpresa;
