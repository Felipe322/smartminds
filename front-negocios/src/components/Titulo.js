import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function DenseAppBar({titulo}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            {titulo}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}