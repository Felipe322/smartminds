import React, { useEffect, useState, useContext, useCallback } from "react";
import Titulo from "../../components/Titulo";
import "./Inicio.css";
import Tarjeta from "./Tarjeta";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import UserContext from "../../context/UserContext";
import { auth } from "../../firebase/firebase";

export default function RecipeReviewCard({ ruta }) {
  //variables de estado
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const { userAuth } = useContext(UserContext);
  const [listaFavoritos, setListaFavoritos] = useState([]);

  //funciones y callbacks
  const recargarFavoritos = useCallback(() => {
    if (userAuth) {
      axios.get(ruta + "api/favoritos/" + userAuth.email).then((res) => {
        setListaFavoritos(res.data);
      });
    }
  },[userAuth,ruta]);

  //useEffects
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
  }, [ruta]);

  useEffect(() => {
    recargarFavoritos();
  }, [userAuth,recargarFavoritos]);


  //return 
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
            <Grid item md={4} key={empresa.id_empresa}>
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
