import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import {
  Container,
  Paper,
  Table,
  TableContainer,
  TableBody,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ShowsListToolbar from 'components/showsList/showsListToolbar/ShowsListToolbar';
import ShowsListHead from 'components/showsList/showsListHead/ShowsListHead';
import ShowsListItem from 'components/showsList/showsListItem/ShowsListItem';
import ShowDetailsModal from 'components/showDetails/ShowDetailsModal';

import useStyles from './ShowsListStyles';

import * as uiActions from 'store/appData/UiSlice';
import * as detailsActions from 'store/userData/ShowDetailsSlice';
import * as checkboxActions from 'store/appData/CheckedListItemsSlice';
import { updateSeasonOrEpisode, deleteShows } from 'store/userData/ShowsSlice';
import { isAnyFilterActive as isFilterActive } from 'store/appData/FiltersSlice';
import EmptyListMessage from './emptyListMessage/EmptyListMessage';

export default function ShowsTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const shows = useSelector((state) => state.shows);
  const isAnyFilterActive = useSelector((state) => isFilterActive(state));
  const { isSidebarOpen } = useSelector((state) => state.ui);

  const { numChecked, checked: selectedShows } = useSelector(
    (state) => state.checkedListItems
  );

  const { status: statusFilter, tags: tagFilter } = useSelector(
    (state) => state.filters
  );

  // TODO: Create a selector for filteredShows
  const filteredShows = shows.filter((show) => {
    let matchesStatusFilter = true;
    let matchesTagFilter = true;

    if (statusFilter) {
      matchesStatusFilter = statusFilter === show.status;
    }

    if (tagFilter.length > 0) {
      matchesTagFilter = show.tags.some((tag) => tagFilter.includes(tag));
    }

    return matchesStatusFilter && matchesTagFilter;
  });

  const createNewShow = () => dispatch(detailsActions.createNewShow());
  const selectShow = (show) => dispatch(detailsActions.selectShow(show));
  const handleIncDec = (payload) => dispatch(updateSeasonOrEpisode(payload));
  const openSidebar = () => dispatch(uiActions.openSidebar());

  function openDetails() {
    setIsDetailsOpen(true);
  }

  function closeDetails() {
    setIsDetailsOpen(false);
  }

  function handleShowClick(show) {
    selectShow(show);
    openDetails();
  }

  function handleCreateNewShowClick() {
    createNewShow();
    openDetails();
  }

  function handleItemCheck(payload) {
    dispatch(checkboxActions.toggleCheck(payload));
  }

  function handleCheckAll() {
    dispatch(checkboxActions.toggleCheckAll(shows.length));
  }

  function handleDelete() {
    const selectedIds = [];
    selectedShows.forEach((isSelected, i) => {
      if (isSelected) selectedIds.push(shows[i].id);
    });

    dispatch(deleteShows(selectedIds));
    dispatch(checkboxActions.resetChecked());
  }

  return (
    <>
      <Container
        className={clsx(
          classes.root,
          isSidebarOpen ? classes.root_sidebarOpen : ''
        )}
      >
        <TableContainer component={Paper}>
          <ShowsListToolbar
            numSelected={numChecked}
            isSidebarOpen={isSidebarOpen}
            handleDelete={handleDelete}
            handleFilterClick={openSidebar}
          />

          <Table>
            <ShowsListHead
              numSelected={numChecked}
              rowsCount={shows.length}
              handleCheckAll={handleCheckAll}
            />

            <TableBody>
              {filteredShows &&
                filteredShows.map((show, i) => (
                  <ShowsListItem
                    i={i}
                    key={show.id}
                    show={show}
                    isChecked={selectedShows[i] || false}
                    handleClick={handleShowClick}
                    handleCheck={handleItemCheck}
                    handleIncDec={handleIncDec}
                  />
                ))}
            </TableBody>
          </Table>

          {filteredShows.length === 0 && (
            <EmptyListMessage
              isAnyFilterActive={isAnyFilterActive}
              handleClick={handleCreateNewShowClick}
            />
          )}
        </TableContainer>
      </Container>

      <Fab
        className={classes.fab}
        onClick={handleCreateNewShowClick}
        color='secondary'
      >
        <AddIcon />
      </Fab>

      <ShowDetailsModal open={isDetailsOpen} handleClose={closeDetails} />
    </>
  );
}
