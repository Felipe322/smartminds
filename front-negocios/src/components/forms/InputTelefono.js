import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MaskedInput from "react-text-mask";


function TextMaskCustom(props) {

    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

function InputTelefono({setTelefono,telefono}) {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="formatted-text-mask-input">
                Telefono(10 digitos)
            </InputLabel>
            <Input
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
                value={telefono}
                onChange = {(e)=>{setTelefono(e.target.value)}}
            />
        </FormControl>
    )
}

export default InputTelefono
