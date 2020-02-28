import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import moment from 'moment';
import React from 'react';

class NameListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name_changes: [] };
  }

  async componentDidMount() {
    this.setState({ name_changes: await this.get_names() });
  }

  async get_names() {
    const res = await axios.get(
      `/api/names`
    );
    return res.data;
  };

  render() {
    return (
      <div>
        <Table size="small" aria-label="name changes">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.name_changes.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{moment(new Date(row.createdAt)).format("M/DD/YYYY, h:mm:ss a")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default NameListComponent;
