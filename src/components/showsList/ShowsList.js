import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  Paper,
  Toolbar,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './ShowsListStyles';
import ShowDetailsModal from 'components/showDetails/ShowDetailsModal';
import * as actions from 'store/ShowDetailsSlice';
import { Typography } from '@material-ui/core';

export default function ShowsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const shows = useSelector((state) => state.shows);
  console.log(shows);
  const createNewShow = () => dispatch(actions.createNewShow());
  const selectShow = (show) => dispatch(actions.selectShow(show));

  function handleShowClick(show) {
    selectShow(show);
    setIsDetailsOpen(true);
  }

  function handleFabClick() {
    createNewShow();
    setIsDetailsOpen(true);
  }

  function formatTags(tagArray) {
    let tagText = '';

    if (tagArray) {
      const lastIndex = tagArray.length - 1;

      tagArray.forEach((tag, i) => {
        tagText += tag;
        if (i !== lastIndex) tagText += ', ';
      });
    }

    return tagText;
  }

  return (
    <>
      <Container className={classes.root}>
        <TableContainer component={Paper}>
          <Toolbar className={classes.toolbar}>
            <Typography>All Shows</Typography>

            <Tooltip title='Delete'>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <Table>
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
                  <TableRow
                    key={show.id}
                    className={classes.listItem}
                    onClick={handleShowClick.bind(this, show)}
                  >
                    <TableCell>{show.title}</TableCell>
                    <TableCell>{show.season}</TableCell>
                    <TableCell>{show.episode}</TableCell>
                    <TableCell>{show.status}</TableCell>
                    <TableCell>{formatTags(show.tags)}</TableCell>
                    <TableCell>{show.note}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Fab className={classes.fab} onClick={handleFabClick} color='secondary'>
        <AddIcon />
      </Fab>

      <ShowDetailsModal
        open={isDetailsOpen}
        handleClose={setIsDetailsOpen.bind(this, false)}
      />
    </>
  );
}
