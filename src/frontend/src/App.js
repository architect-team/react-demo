import Button from '@material-ui/core/Button';
import { default as blue, default as green } from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
  let changed_name = '';

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: blue,
      secondary: green,
    }
  });

  // TODO: save and list names of the user, starting with the user's account name from the deployment as the base case

  const post_name = async () => {
    const res = await axios.post(`${process.env.API_HOST}:${process.env.API_PORT}/name`, { name: changed_name }, { headers: { 'Content-Type': 'application/json' } });
    console.log(res);
  };

  const change_name = (e) => {
    changed_name = e.target.value;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {JSON.stringify(process.env)}
          Hello {process.env.API_HOST}
        </p>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <TextField id="name-text-field" label="Change name" onChange={change_name} />
                <Button id="submit-button" variant="contained" onClick={post_name}>Change</Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
