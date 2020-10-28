import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./BarraNavegacion.css";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';


const estilo = makeStyles({
  root: {
    width: 300,
  },
});

export default function BarraNav() {
  const classes = estilo();
  const [value, setValor] = React.useState('recents');

  const handleChange = (event, nuevoValor) => {
    setValor(nuevoValor);
  };

  return (
    <div className="barra_nav">
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Buscar" icon={<SearchRoundedIcon />} />
      </BottomNavigation>
    </div>
  );
}
