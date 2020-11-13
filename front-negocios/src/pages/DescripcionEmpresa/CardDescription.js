import React, { useContext, useEffect } from 'react'
import './CardDescription.css'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import image from '../../images/imagen.png'
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from '@material-ui/core/Card/Card'
import { pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Typography from '@material-ui/core/Typography'
import UserContext from "../../context/UserContext";
import { useParams } from "react-router-dom";



//Styles
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
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    })
);






function CardDescription({ ruta, empresa }) {
    //variables
    const classes = useStyles();
    const { id } = useParams();
    const [value, setValue] = React.useState(-1);
    const { userAuth } = useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const [promedio, setPromedio] = React.useState();


    useEffect(() => {
        axios.get(ruta + 'api/calificaciones/' + id)
            .then((res) => {
                setPromedio(res.data[0]["puntuacion"])
            })
        if (userAuth) {
            axios.get(ruta + 'api/calificacion/' + id + '/' + userAuth.email)
                .then((res) => {
                    setValue(res.data);
                })
        }

    }, [userAuth])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCalificacion = (event, newValue) => {
        setValue(newValue);

        let objeto = {
            "correo": userAuth.email,
            "id_empresa": empresa.id_empresa,
            "puntuacion": newValue
        }

        axios.post(ruta + 'api/calificacion/', objeto, (res) => {
            console.log(res);
        })
        handleClose();
        window.location.href = "/empresa/ver/" + id;
    }


    //render
    return (
        <Container maxWidth="md" className="container_description">
            <Card className={classes.root + "card"} style={{ backgroundColor: "white" }} raised>

                <Grid container>
                    <Grid item xs={6}>
                        <img src={empresa.imagen || image} className="imagen" alt=""></img>
                    </Grid>
                    <Grid item xs={6}>
                        <br /><br />
                        <h2 className="tipografia contenido">{empresa.nombre}</h2>
                        <h3 className="tipografia"><span role="img" aria-label="start">⭐ {promedio}</span></h3>

                    </Grid>
                </Grid>
                <CardContent>
                    <h5 className="tipografia subtitulo" >Dirección:</h5>
                    <h3 className="tipografia contenido">{empresa.direccion}</h3>
                    <h5 className="tipografia subtitulo" >Descripción:</h5>
                    <h3 className="tipografia contenido">{empresa.descripcion}</h3>
                    <h5 className="tipografia subtitulo" >Teléfono: </h5>
                    <h3 className="tipografia contenido">{empresa.telefono}</h3>
                    <h5 className="tipografia subtitulo" >Email: </h5>
                    <h3 className="tipografia contenido">{empresa.email}</h3>
                </CardContent>
                <CardActions disableSpacing className="favorite_container">
                    <Grid container>
                        <Grid item xs={7}>
                            <FavoriteIcon color="disabled" className="icono__favorito" />
                        </Grid>
                        <Grid item xs={5}>
                            <div>
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={handleOpen}
                                >
                                    <span role="img" aria-label="start">⭐ Calificar</span>
                                </Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>

                                        <div className={classes.paper}>
                                            <Typography variant="title">Mi puntuacion:</Typography><br/>
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={handleChangeCalificacion}
                                            />
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>


                        </Grid>
                    </Grid>
                </CardActions>

            </Card>
        </Container>
    )
}

export default CardDescription
