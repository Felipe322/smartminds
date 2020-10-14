import React, { useEffect, useState } from "react";
import Titulo from "../../components/Titulo";
import "./Inicio.css";
import Tarjeta from "./Tarjeta";
import axios from "axios";

export default function RecipeReviewCard() {
  const [listaEmpresas, setListaEmpresas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:5000/api/empresa/")
        .then((res) => {
          console.log(res.data);
          setListaEmpresas(res.data);
        })
        .catch((error) => {
          alert(error);
        });
    }
    fetchData();
  },[]);

  return (
    <>
      <Titulo titulo="Inicio" />
      <div className="contenedorCards">
        {listaEmpresas.map((empresa)=>
          <Tarjeta empresa={empresa}>Empresa</Tarjeta>
        )}
      </div>
    </>
  );
}
