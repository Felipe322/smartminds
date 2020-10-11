import { Button } from '@material-ui/core'
import React from 'react'
import Titulo from '../../components/Titulo'
import './Inicio.css'
import './Cards.css'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, pink } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 0,
      paddingTop: '55%',
    },
    avatar: {
      backgroundColor: blue[500],//Imagen de la base
    },
  }),
);

export default function RecipeReviewCard() {
  const classes = useStyles();
  return (
    <div className='contenedorCards'>
        <Card className={classes.root} className='sombraCards'>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
                T
            </Avatar>
            }
            title="Zapatería Limones"//Nombre de la empresa de la base de datos.
            subheader="Los mejores zapatos de la region"//Subtitulo de la base de datos. 
        />
        <CardMedia
            className={classes.media}
            image="https://e00-elmundo.uecdn.es/elmundo/imagenes/2013/07/09/economia/1373363070_0.jpg"//Imagen de la base
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            Zapatos para toda la familia, con todos los gusto. Nuestros clientes
            siempre están satisfechos con el producto y con el trato.//Breve descripción de la empresa. 
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton>
            <FavoriteIcon color="primary"/>
            </IconButton>
        </CardActions>
        </Card>
    </div>
  );
}