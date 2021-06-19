import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import useStyles from "./ShowsTableStyles";

export default function ShowsTable(props) {
  const classes = useStyles();
  const { shows } = props;

  return (
    <>
      <Container className={classes.root} component='main'>
        <TableContainer component={Paper}>
          <Table>
            <caption>All Shows</caption>

            <TableHead>
              <TableRow className={classes.headerRow}>
                <TableCell>Title</TableCell>
                <TableCell>Season</TableCell>
                <TableCell>Episode</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Note</TableCell>
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
      </Container>

      <Fab className={classes.fab} color='secondary'>
        <AddIcon />
      </Fab>
    </>
  );
}
