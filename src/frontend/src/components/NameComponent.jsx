import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';

class NameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { changed_name: process.env.REACT_APP_WORLD_TEXT };
  }

  async post_name() {
    await axios.post(
      `/api/name`,
      { name: this.state.changed_name }
    );
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
              <TextField id="name-text-field" label="Change name" onChange={this.change_name.bind(this)} />
              <Button id="submit-button" variant="contained" onClick={this.post_name.bind(this)}>Change</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default NameComponent;
