import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { user } from 'assets/mock-user';

class WatchList extends Component {
  render() {
    const { shows: items } = user;
    const shows = items.map(show => {
      return (
        <tr>
          <td>{show.title}</td>
          <td>{show.current.season}</td>
          <td>{show.current.episode}</td>
          <td>{show.status}</td>
          <td>{show.tags}</td>
          <td>{show.comments}</td>
        </tr>
      );
    });


    return (
      <main>
        <Table striped>
          <caption>All Shows</caption>
          <thead>
            <tr>
              <th>title</th>
              <th>season</th>
              <th>episode</th>
              <th>status</th>
              <th>tags</th>
              <th>note</th>
            </tr>
          </thead>
          <tbody>
            {shows}
          </tbody>
        </Table>
      </main>
    );
  }
}

export default WatchList;
