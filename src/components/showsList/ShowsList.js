import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  Paper,
  Table,
  TableContainer,
  TableBody,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './ShowsListStyles';
import ShowsListToolbar from 'components/showsList/showsListToolbar/ShowsListToolbar';
import ShowsListHead from 'components/showsList/showsListHead/ShowsListHead';
import ShowsListItem from 'components/showsList/showsListItem/ShowsListItem';
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

  function openDetails() {
    setIsDetailsOpen(true);
  }

  function closeDetails() {
    setIsDetailsOpen(false);
  }

  function handleFabClick() {
    createNewShow();
    openDetails();
  }

  function handleSelectAll() {
    if (numSelected < shows.length) {
      const newSelectedShows = [];
      for (let i = 0; i < shows.length; i++) {
        newSelectedShows[i] = true;
      }

      setSelectedShows(newSelectedShows);
      setNumSelected(newSelectedShows.length);
    } else if (shows.length > 0 && numSelected === shows.length) {
      setSelectedShows([]);
      setNumSelected(0);
    }
  }

  function handleItemCheck(i, e) {
    if (e.target.checked) setNumSelected((prevState) => ++prevState);
    else setNumSelected((prevState) => --prevState);

    setSelectedShows((prevState) => {
      const newState = [...prevState];
      newState[i] = e.target.checked;
      return newState;
    });
  }

  return (
    <>
      <Container className={classes.root}>
        <TableContainer component={Paper}>
          <ShowsListToolbar />

          <Table>
            <ShowsListHead
              numSelected={numSelected}
              rowsCount={shows.length}
              handleSelectAll={handleSelectAll}
            />

            <TableBody>
              {shows &&
                shows.map((show, i) => (
                  <ShowsListItem
                    show={show}
                    isChecked={selectedShows[i] || false}
                    selectShow={selectShow}
                    openDetails={openDetails}
                    handleCheck={handleItemCheck.bind(this, i)}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Fab className={classes.fab} onClick={handleFabClick} color='secondary'>
        <AddIcon />
      </Fab>

      <ShowDetailsModal open={isDetailsOpen} handleClose={closeDetails} />
    </>
  );
}
