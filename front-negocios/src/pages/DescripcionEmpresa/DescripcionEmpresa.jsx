import React, {useState,useEffect} from "react";
import Titulo from "../../components/Titulo";
import CardDescription from "./CardDescription";
import axios from 'axios';
import {useParams} from "react-router-dom";
import BarraNavegacion from "../Inicio/BarraNavegacion.js";
import Comentarios from "./Comentarios";

function DescripcionEmpresa({ruta}) {
  //variables de estado
  const [empresa, setEmpresa] = useState([]);
  const { id } = useParams();
  //funciones y callbacks
  
  //use effects
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
  
  //render
  return (
    <div>
      <Titulo titulo="Descripción Empresa" />
      <CardDescription empresa={empresa} ruta={ruta}></CardDescription>
      <Comentarios id={empresa.id} ruta={ruta}></Comentarios>
      <BarraNavegacion></BarraNavegacion>
    </div>
  );
}

export default DescripcionEmpresa;
