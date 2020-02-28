import Button from '@material-ui/core/Button';
import { default as blue, default as green } from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';
import './App.css';
import logo from './logo.svg';

class NameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { changed_name: process.env.ACCOUNT_NAME };
    this.theme = createMuiTheme({
      palette: {
        type: 'dark',
        primary: blue,
        secondary: green,
      }
    });
  }
  // TODO: save and list names of the user, starting with the user's account name from the deployment as the base case

  async post_name() {
    // `http://172.19.0.3:8080/name` cors issues with using docker address
    // `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/name`

    const res = await axios.post(
      `http://172.19.0.3:${process.env.REACT_APP_API_PORT}/name`,
      { name: this.state.changed_name }
    );
    console.log(res);
  };

  change_name(e) {
    this.setState({ changed_name: e.target.value });
  }

  render() {
    return (
      <div>
        <p>
          Hello {this.state.changed_name}
        </p>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ThemeProvider theme={this.theme}>
                <TextField id="name-text-field" label="Change name" onChange={this.change_name.bind(this)} />
                <Button id="submit-button" variant="contained" onClick={this.post_name.bind(this)}>Change</Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NameComponent />
      </header>
    </div>
  );
}

export default App;
