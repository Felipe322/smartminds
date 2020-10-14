import React, {useState} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
  }));
  

function InputHorarios({dias,setDias,horaAbrir,horaCerrar,setHoraCerrar,setHoraAbrir}) {
    const classes = useStyles();
    const [diasSemana] = useState(['Lu','Ma','Mi','Ju','Vi','Sa','Do']);

    const getHorarioFormateado = () => {
        return horaAbrir+" "+horaAbrir;
    }

    const handleChange = (e) => {
        let indice = dias.indexOf(e.target.name);
        if(indice===-1){
            dias.push(e.target.name)
        }else{
            dias.splice(1,indice);
        }
        let dias2 = dias.slice();
        setDias(dias2);
    }

    return (
        <div>
            <InputLabel htmlFor="formatted-text-mask-input">
                Dias de la semana
            </InputLabel>
            <br/>
            <div>
            {diasSemana.map((dia)=>
                <FormControlLabel
                            control={<Checkbox checked={dias.indexOf(dia)!==-1} name={dia} />}
                            label={dia}
                            onChange = {handleChange}
                        />
            )}
            
            
            </div>
            <TextField
                id="time"
                label="Abierto"
                type="time"
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                fullWidth
                value={horaAbrir}
                onChange={(e)=>{setHoraAbrir(e.target.value)}}
            /><br /><br />
            <TextField
                id="time"
                label="Cerrado"
                type="time"
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                fullWidth
                value={horaCerrar}
                onChange={(e)=>{setHoraCerrar(e.target.value)}}
            />
        </div>
    )
}

export default InputHorarios
