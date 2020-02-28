import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import './App.css';
import NameComponent from './components/NameComponent';
import logo from './logo.svg';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: blue,
      secondary: blue,
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <NameComponent />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
