import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { user } from "assets/mock-user";

function App() {
  const { shows: items } = user;

  const shows = items.map((show) => {
    return (
      <TableRow>
        <TableCell>{show.title}</TableCell>
        <TableCell>{show.current.season}</TableCell>
        <TableCell>{show.current.episode}</TableCell>
        <TableCell>{show.status}</TableCell>
        <TableCell>{show.tags}</TableCell>
        <TableCell>{show.comments}</TableCell>
      </TableRow>
    );
  });

  return (
    <div className='App'>
      <main>
        <TableContainer component={Paper}>
          <Table>
            <caption>All Shows</caption>

            <TableHead>
              <TableRow>
                <TableCell>title</TableCell>
                <TableCell>season</TableCell>
                <TableCell>episode</TableCell>
                <TableCell>status</TableCell>
                <TableCell>tags</TableCell>
                <TableCell>note</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{shows}</TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}

export default App;
