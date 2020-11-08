import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserContextProvider } from '../src/context/UserContext'
import { ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: '#f44336',
    },
  },
});



ReactDOM.render(
  <UserContextProvider>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </ThemeProvider>
  </UserContextProvider>
  
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
