import React, { useState } from 'react'
import Comentario from './Comentario'
import {useContext,useEffect} from 'react'
import UserContext from "../../context/UserContext";
import axios from 'axios';
import {useParams} from "react-router-dom";

function ListaComentarios({ruta}) {
    const { userAuth } = useContext(UserContext);
    const [listaComentarios,setListaComentarios] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(ruta+'api/comentario/'+id)
        .then((res) => {
            setListaComentarios(res.data);
          })
          .catch((error) => {
            alert(error);
          });
          
    }, [userAuth,id])

    return (
        <div>
            {listaComentarios.map((comentario) => {
                return <Comentario comentario={comentario} userAuth={userAuth} ruta={ruta} id={id}/>
            })}
        </div>
    )
}

export default ListaComentarios
