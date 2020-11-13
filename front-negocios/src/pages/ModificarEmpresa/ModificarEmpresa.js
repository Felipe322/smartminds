import React, { useState, useEffect } from "react";
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
import axios from "axios";
import ContextUser from "../../context/UserContext";
import { useContext } from "react";
import {useParams} from "react-router-dom";

function ModificarEmpresa({ruta}) {
////////////////////////////////CONTEXTO DE SESSION///////////////////////////////////////////////////////
const { userAuth} = useContext(ContextUser);
//////////////////////////////////STATE////////////////////////////////////////////////////////////////////
const [empresa, setEmpresa] = useState([]);
const { id } = useParams();
const [nombre, setNombre] = useState(null);
const [descripcion, setDescripcion] = useState(null);
const [direccion, setDireccion] = useState(null);
const [telefono, setTelefono] = useState();
const [email, setEmail] = useState();
const [categorias, setCategorias] = useState([]);
const [listaCategorias] = useState([
  "Comida",
  "Servicios",
  "Productos",
  "Salud",
]);
const [dias, setDias] = useState([]);
const [horaAbrir, setHoraAbrir] = useState("07:30");
const [horaCerrar, setHoraCerrar] = useState("18:30");
const [,setImagen] = useState();
const [pathImage] = useState("");
const [diasSemana] = useState(["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"]);
const [loading, setLoading] = useState(false);


////////Use Effect//////////////////
useEffect(() => {
    async function fetchData() {
      await axios
        .get(ruta+"api/empresa/"+id)
        .then((res) => {
          console.log(res.data[0].nombre);
          setEmpresa(res.data[0]);
        })
        .catch((error) => {
          alert(error);
        });   
    }
    fetchData();
  },[id,ruta]);


useEffect(() => {
  setNombre(empresa.nombre);
  setDescripcion(empresa.descripcion);
  setDireccion(empresa.direccion);
  setTelefono(empresa.telefono);
  setEmail(empresa.email);
  setImagen(empresa.image);
},[empresa]);
/////////////////////////////////////Funciones//////////////////////////////////////////////////////


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
    alert("Introduce un número de teléfono de 10 dígitos");
    setLoading(false);
    return;
  }
  let urlImagen = null;
  if (pathImage !== "") {
    urlImagen = await uploadImage();
  }

  const empresa = {
    id,
    nombre,
    direccion,
    email,
    telefono: convertirTelefono(telefono),
    descripcion,
    horario: horarioFormateado(),
    imagen: urlImagen,
  };

  axios
    .post(ruta + "api/empresa/modificar", empresa, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((response) => {
      console.log(response);
      window.location.href = "/empresa/ver/"+id;
    })
    .catch((error) => {
      alert(error.response);
      window.location.href = "/";
    });
};

////////////////////////////////////////////////Vista/////////////////////////////////////////////////////////////
  if (userAuth) {
    return (
      <div>
        <Titulo titulo="Modificar Empresa" />
        <Container maxWidth="md" className="formulario">
          <form
            autoComplete="off"
            enctype="multipart/form-data"
            onSubmit={handleSubmit}
            
          >
            {/*Avatar*/}
            {/*<div className="avatarContainer">
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
            </div>*/}
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
              label="Descripción empresa"
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
              label="Dirección"
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
            >
              {loading && <CircularProgress size={20}></CircularProgress>}
              Modificar empresa
            </Button>
          </form>
        </Container>
      </div>
    );
  }else{
    return <><Titulo titulo="Modificar Empresa" /><br/><p>Error: Lo sentimos.., no se puede registrar empresas sin hacer login</p></>
  }
}

export default ModificarEmpresa
