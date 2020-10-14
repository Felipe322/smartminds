import React from 'react'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {pink } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from '@material-ui/core/Card/Card'
import image from '../../images/imagen.png'


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

function Tarjeta({empresa}) {
    const classes = useStyles();
    return (
        <Card className={classes.root+" sombraCards"}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                T
              </Avatar>
            }
            title={empresa.nombre} //Nombre de la empresa de la base de datos.
            subheader={empresa.direccion}//Subtitulo de la base de datos.
          />
          <CardMedia
            className={classes.media}
            image={image}//Imagen de la base
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {empresa.descripcion}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton>
              <FavoriteIcon color="primary" />
            </IconButton>
          </CardActions>
        </Card>
    )
}

export default Tarjeta
