import React, { useEffect, useState } from "react";
import Titulo from "../../components/Titulo";
import "./Inicio.css";
import Tarjeta from "./Tarjeta";
import BarraNavegacion from "./BarraNavegacion";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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
      <Container maxWidth="md" className="container_description">
        <Grid container spacing={0} direction="row" justify="space-around">
          <Grid item md={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                window.location.href = "/empresa/crear";
              }}
            >
              Registrar empresa
            </Button>
          </Grid>
          {listaEmpresas.map((empresa) => (
            <Grid item md={4}>
              <Link to={`/empresa/ver/` + empresa.id_empresa}>
                <Tarjeta empresa={empresa}>Empresa</Tarjeta>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      <BarraNavegacion></BarraNavegacion>
    </>
  );
}
