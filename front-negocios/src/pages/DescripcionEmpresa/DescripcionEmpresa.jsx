import React, {useState,useEffect} from "react";
import Titulo from "../../components/Titulo";
import CardDescription from "./CardDescription";
import axios from 'axios';
import {useParams} from "react-router-dom";
import BarraNavegacion from "../Inicio/BarraNavegacion.js";

function DescripcionEmpresa({ruta}) {
  const [empresa, setEmpresa] = useState([]);
  const { id } = useParams();

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
  },[]);
  
  return (
    <div>
      <Titulo titulo="Descripcion Empresa" />
      <CardDescription empresa={empresa}></CardDescription>
      <BarraNavegacion></BarraNavegacion>
    </div>
  );
}

export default DescripcionEmpresa;
