import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from 'axios';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import LoginPage from "./components/Login"
import HomePage from "./components/HomePage"
import SignUp from "./components/SignUp"


function App() {
  useEffect(() => {
    Axios.get("http://localhost:4000").then(res => {
      console.log(res);
    });
  }, [])

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ff4400',
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            {/* <Route path="/" exact component={() => <Welcome />} /> */}
            <Route path="/signup" component={() => <SignUp />} />
            <Route path="/login" component={() => <LoginPage />} />
            <Route
              crossorigin
              path="/"
              component={() => <HomePage />}
            />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
