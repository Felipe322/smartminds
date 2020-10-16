import React, {useState,useEffect} from "react";
import Titulo from "../../components/Titulo";
import CardDescription from "./CardDescription";
import axios from 'axios';
import {useParams} from "react-router-dom";


function DescripcionEmpresa() {
  const [empresa, setEmpresa] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:5000/api/empresa/"+id)
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
    </div>
  );
}

export default DescripcionEmpresa;
