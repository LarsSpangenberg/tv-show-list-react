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

import * as detailsActions from 'store/ShowDetailsSlice';
import { toggleCheck, toggleCheckAll, resetChecked } from 'store/CheckedListItemsSlice';
import { updateSeasonOrEpisode, deleteShows } from 'store/ShowsSlice';

export default function ShowsTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const shows = useSelector((state) => state.shows);
  const { numChecked: numSelected, checked: selectedShows } = useSelector(
    (state) => state.checkedListItems
  );

  const createNewShow = () => dispatch(detailsActions.createNewShow());
  const handleIncDec = (payload) => dispatch(updateSeasonOrEpisode(payload))
  const selectShow = (show) => dispatch(detailsActions.selectShow(show));
  const handleItemCheck = (payload) => dispatch(toggleCheck(payload));
  const handleSelectAll = () => dispatch(toggleCheckAll(shows.length));

  function handleDelete() {
    const selectedIds = [];
    selectedShows.forEach((isSelected, i) => {
      if (isSelected) selectedIds.push(shows[i].id);
    });

    dispatch(deleteShows(selectedIds));
    dispatch(resetChecked());
  };

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

  return (
    <>
      <Container className={classes.root}>
        <TableContainer component={Paper}>
          <ShowsListToolbar
            numSelected={numSelected}
            handleDelete={handleDelete}
          />

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
                    i={i}
                    show={show}
                    isChecked={selectedShows[i] || false}
                    selectShow={selectShow}
                    openDetails={openDetails}
                    handleCheck={handleItemCheck}
                    handleIncDec={handleIncDec}
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
