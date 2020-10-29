import React from 'react';
import "./BarraNavegacion.css";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

export default function BarraNav() {
  const [value, setValor] = React.useState('recents');
  const handleChange = (event, nuevoValor) => {
    setValor(nuevoValor);
  };

  return (
    <div className="barra_nav">
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} onClick={() => {window.location.href = "/";}}/>
        <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon />} onClick={() => {window.location.href = "/favoritos";}}/>
        <BottomNavigationAction label="Buscar" icon={<SearchRoundedIcon />} onClick={() => {window.location.href = "/buscar";}} />
      </BottomNavigation>
    </div>
  );
}