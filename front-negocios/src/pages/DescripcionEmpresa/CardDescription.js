import React from 'react'
import './CardDescription.css'
import { makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import image from '../../images/imagen.png'
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from '@material-ui/core/Card/Card'
import { pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 300,
        },
        media: {
            height: 0,
            paddingTop: "55%",
            margin: "10%"
        },
        avatar: {
            backgroundColor: pink[500], //Imagen de la base
        },
    })
);


function CardDescription({ empresa }) {
    const classes = useStyles();
    return (
        <Container maxWidth="md" className="container_description">
            <Card className={classes.root + "card"} style={{ backgroundColor: "white" }}>

                <Grid container spacing="2">
                    <Grid item xs={6}>
                        <img src={image} className="imagen" alt=""></img>
                    </Grid>
                    <Grid item xs={6}>
                        <br/><br/>
                        <h2 className="tipografia contenido">{empresa.nombre}</h2>    
                        <h3 className="tipografia"> <span role="img" aria-label="start">⭐</span>~.~</h3>    

                    </Grid>
                </Grid>
                <CardContent>
                    <h5 className="tipografia subtitulo" >Direccion:</h5>
                    <h3 className="tipografia contenido">{empresa.direccion}</h3>
                    <h5 className="tipografia subtitulo" >Descripcion:</h5>
                    <h3 className="tipografia contenido">{empresa.descripcion}</h3>
                    <h5 className="tipografia subtitulo" >Telefono: </h5>
                    <h3 className="tipografia contenido">Telefono: {empresa.telefono}</h3>
                    <h5 className="tipografia subtitulo" >Email: </h5>
                    <h3 className="tipografia contenido">{empresa.email}</h3>
                </CardContent>
                <CardActions disableSpacing className="favorite_container">
                    <IconButton>
                        <FavoriteIcon color="primary" />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    )
}

export default CardDescription
