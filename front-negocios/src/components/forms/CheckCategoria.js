import React from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from '@material-ui/core/Grid'

function CheckCategoria({categorias,setCategorias,listaCategorias}) { 

    const handleChange = (e) =>{
        let indice =  categorias.indexOf(e.target.name)
        if(indice===-1){
            categorias.push(e.target.name);
        }else{
            categorias.splice(indice,1)
        }

        var cat2 = categorias.slice();
        setCategorias(cat2)
    }

    return (
        <div>
            <InputLabel htmlFor="formatted-text-mask-input">
                Categorias
            </InputLabel>
            <FormGroup col label="hola">
                <Grid container spacing={0}>

                    {listaCategorias.map((producto,index)=>
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={<Checkbox checked={categorias.indexOf(producto)!==-1} name={producto} />}
                                label={producto}
                                onChange={handleChange}
                            />
                        </Grid>
                    )}
                    </Grid>
            </FormGroup>
        </div>
    )
}

export default CheckCategoria
