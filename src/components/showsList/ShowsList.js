import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  Checkbox,
  Table,
  TableContainer,
  TableBody,
  TableCell,
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

export default function ShowsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedShows, setSelectedShows] = useState([]);
  const [numSelected, setNumSelected] = useState(0);

  const shows = useSelector((state) => state.shows);
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

  function isAllSelected() {
    return shows.length > 0 && numSelected === shows.length;
  }

  function isAnySelected() {
    return numSelected > 0 && numSelected < shows.length;
  }

  function handleSelectAllClick() {
    if (numSelected < shows.length) {
      const newSelectedShows = [];
      for (let i = 0; i < shows.length; i++) {
        newSelectedShows[i] = true;
      }

      setSelectedShows(newSelectedShows);
      setNumSelected(newSelectedShows.length);
    } else if (isAllSelected()) {
      setSelectedShows([]);
      setNumSelected(0);
    }
  }

  function handleItemCheckboxChange(i, e) {
    if (e.target.checked) setNumSelected((prevState) => ++prevState);
    else setNumSelected((prevState) => --prevState);

    setSelectedShows((prevState) => {
      const newState = [...prevState];
      newState[i] = e.target.checked;
      return newState;
    });
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
                <TableCell padding='checkbox'>
                  <Checkbox
                    indeterminate={isAnySelected()}
                    checked={isAllSelected()}
                    onClick={handleSelectAllClick}
                  />
                </TableCell>
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
                shows.map((show, i) => (
                  <TableRow key={show.id} className={classes.listItem}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selectedShows[i] || false}
                        onChange={handleItemCheckboxChange.bind(this, i)}
                      />
                    </TableCell>

                    <TableCell onClick={handleShowClick.bind(this, show)}>
                      {show.title}
                    </TableCell>

                    <TableCell onClick={handleShowClick.bind(this, show)}>
                      {show.season}
                    </TableCell>

                    <TableCell onClick={handleShowClick.bind(this, show)}>
                      {show.episode}
                    </TableCell>

                    <TableCell onClick={handleShowClick.bind(this, show)}>
                      {show.status}
                    </TableCell>

                    <TableCell onClick={handleShowClick.bind(this, show)}>
                      {formatTags(show.tags)}
                    </TableCell>

                    <TableCell onClick={handleShowClick.bind(this, show)}>
                      {show.note}
                    </TableCell>
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
