import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

export default function ShowsTable(props) {
  const { shows } = props;

  return (
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

        <TableBody>
          {shows &&
            shows.map((show) => (
              <TableRow key={show.id}>
                <TableCell>{show.title}</TableCell>
                <TableCell>{show.current.season}</TableCell>
                <TableCell>{show.current.episode}</TableCell>
                <TableCell>{show.status}</TableCell>
                <TableCell>{show.tags}</TableCell>
                <TableCell>{show.comments}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
