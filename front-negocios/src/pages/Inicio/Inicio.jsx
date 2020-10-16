import React, { useEffect, useState } from "react";
import Titulo from "../../components/Titulo";
import "./Inicio.css";
import Tarjeta from "./Tarjeta";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button'
export default function RecipeReviewCard({ ruta }) {
  const [listaEmpresas, setListaEmpresas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(ruta + "api/empresa/")
        .then((res) => {
          console.log(res.data);
          setListaEmpresas(res.data);
        })
        .catch((error) => {
          alert(error);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <Titulo titulo="Inicio" />
      <div className="contenedorCards">
        <Button variant="outlined" color="primary" onClick={()=>{window.location.href = '/empresa/crear';}}>
          Registrar empresa
        </Button>
        {listaEmpresas.map((empresa) => (
          <Link to={`/empresa/ver/` + empresa.id_empresa}>
            <Tarjeta empresa={empresa}>Empresa</Tarjeta>
          </Link>
        ))}
      </div>
    </>
  );
}
