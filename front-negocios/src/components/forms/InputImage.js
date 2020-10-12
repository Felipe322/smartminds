import React,{useState} from 'react'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

function InputImage() {
    const classes = useStyles();
    const [file1,setFile1] = useState()

    return (

        <div>
            <InputLabel htmlFor="formatted-text-mask-input">
                Fotos
            </InputLabel>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span"
                onChange={(event)=>{alert(event.target.value)}}>
                    <PhotoCamera />
                </IconButton>
            </label>
            <img src={file1} alt=""/>
            


            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </div>
    )
}

export default InputImage

