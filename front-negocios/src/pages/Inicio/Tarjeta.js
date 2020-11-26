import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { pink } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from '@material-ui/core/Card/Card'
import image from '../../images/imagen.png'
import { Link } from "react-router-dom";
import './Cards.css';
import ContextUser from "../../context/UserContext";


//estilos
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 0,
      paddingTop: "55%",
    },
    avatar: {
      backgroundColor: pink[500], //Imagen de la base
    },
  })
);




function Tarjeta({ empresa, favorito,ruta,recargarFavoritos,listaFavoritos,setListaFavoritos}) {

  

  //variables de estado y contexto
  const [isFavorite,setIsFavorite] = useState(favorito);
  const { userAuth } = useContext(ContextUser);
  const classes = useStyles();

  //funciones y callbacks
  const favoritos =  (e) => {
    e.preventDefault();
    let nuevaLista = listaFavoritos.slice();
    if(listaFavoritos.indexOf(empresa.id_empresa) >= 0){
      nuevaLista.splice((nuevaLista.indexOf(empresa.id_empresa),1));
    }else{
      nuevaLista.push(empresa.id);
    }
    setListaFavoritos(nuevaLista);

    let favorito_empresa = {
        "correo" : userAuth.email,
        "id_empresa": empresa.id_empresa
    }
 
    if(favorito){
      axios.post(ruta + "api/favorito/eliminar/", favorito_empresa, {
        headers: { "Access-Control-Allow-Origin": "*" },
        }).then((result)=>{
          setIsFavorite(!isFavorite);
          recargarFavoritos();
        }).catch((e)=>{
        })
    }else{
      axios.post(ruta + "api/favorito",favorito_empresa, {
        headers: { "Access-Control-Allow-Origin": "*"},
        }).then((result)=>{
          setIsFavorite(!isFavorite);
          recargarFavoritos();
        }).catch((e)=>{
        })
    }
  }
  //useEffects
  useEffect(() => {
    recargarFavoritos()
  }, [isFavorite,recargarFavoritos])

  //render
  return (
    <Card className={classes.root + " sombraCards"} raised>
      <Link to={`/empresa/ver/` + empresa.id_empresa}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {empresa.nombre.substring(0,1).toUpperCase()}
              </Avatar>
          }
          title={empresa.nombre} //Nombre de la empresa de la base de datos.
          subheader={empresa.direccion}//Subtitulo de la base de datos.
        />
        <CardMedia
          className={classes.media}
          image={empresa.imagen || image}//Imagen de la base
        />
        <CardContent className="contenido__tarjeta">
          <Typography variant="body2" color="textSecondary" component="p">
            {empresa.descripcion}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing className="favorito">
        {userAuth && 
        <IconButton onClick={favoritos}>
          <FavoriteIcon color={favorito ? "primary" : "inherit"} />
        </IconButton>}
      </CardActions>
    </Card>
  )
}

export default Tarjeta
