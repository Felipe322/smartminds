import React, { useEffect, useState, useContext } from "react";
import Titulo from "../../components/Titulo";
import "./Inicio.css";
import Tarjeta from "./Tarjeta";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import UserContext from "../../context/UserContext";
import { auth } from "../../firebase/firebase";

export default function RecipeReviewCard({ ruta }) {
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const { userAuth } = useContext(UserContext);
  const [listaFavoritos, setListaFavoritos] = useState([]);

  const recargarFavoritos = () => {
    if (userAuth) {
      axios.get(ruta + "api/favoritos/" + userAuth.email).then((res) => {
        setListaFavoritos(res.data);
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(ruta + "api/empresa/")
        .then((res) => {
          setListaEmpresas(res.data);
        })
        .catch((error) => {
          alert(error);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    recargarFavoritos();
  }, [userAuth]);

  return (
    <>
      <Titulo titulo="Inicio" />
      <Container maxWidth="md" className="container_description">
        <Grid container direction="row" justify="space-around">
          {(() => {
            if (userAuth) {
              return (
                <>
                  <Grid item>
                    <a href="/empresa/crear">Registrar empresa</a>
                  </Grid>
                  <Grid item>
                    <a
                      href=""
                      onClick={() => {
                        auth.signOut();
                      }}
                    >
                      Cerrar Sesión
                    </a>
                  </Grid>
                  <Grid item>
                    <a href="/empresa/MisEmpresas">Mis Empresas</a>
                    </Grid>
                </>
              );
            } else {
              return <a href="/Login">Ingresar</a>;
            }
          })()}
        </Grid>
        <Grid container direction="row" justify="center">
          <Grid item md={12}>
          </Grid>
          {listaEmpresas.map((empresa) => (
            <Grid item md={4}>
              <Tarjeta
                empresa={empresa}
                favorito={listaFavoritos.indexOf(empresa.id_empresa) >= 0}
                ruta={ruta}
                recargarFavoritos={recargarFavoritos}
                listaFavoritos={listaFavoritos}
                setListaFavoritos={setListaFavoritos}
              >
                Empresa
              </Tarjeta>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
