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
import EmptyListMessage from './emptyListMessage/EmptyListMessage';

import useStyles from './ShowsListStyles';

import * as uiActions from 'store/appData/UiSlice';
import * as detailsActions from 'store/userData/ShowDetailsSlice';
import { updateSeasonOrEpisode, deleteShows } from 'store/userData/ShowsSlice';
import {
  toggleCheck,
  toggleCheckAll,
  resetChecked,
  getCheckedItemIds,
} from 'store/appData/CheckedListItemsSlice';
import {
  getFilteredShows,
  getIsAnyFilterActive,
} from 'store/appData/FiltersSlice';

export default function ShowsList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const shows = useSelector((state) => state.shows);
  const filteredShows = useSelector((state) => getFilteredShows(state));
  const isAnyFilterActive = useSelector((state) => getIsAnyFilterActive(state));
  const checkedItemIds = useSelector((state) => getCheckedItemIds(state));
  const { numChecked, checked: selectedShows } = useSelector(
    (state) => state.checkedListItems
  );
  const { isSidebarOpen } = useSelector((state) => state.ui);

  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);

  const createNewShow = () => dispatch(detailsActions.createNewShow());
  const selectShow = (show) => dispatch(detailsActions.selectShow(show));
  const handleItemCheck = (payload) => dispatch(toggleCheck(payload));
  const handleCheckAll = () => dispatch(toggleCheckAll(shows.length));
  const handleIncDec = (payload) => dispatch(updateSeasonOrEpisode(payload));
  const openSidebar = () => dispatch(uiActions.openSidebar());

  function handleShowClick(show) {
    selectShow(show);
    openDetails();
  }

  function handleCreateNewShowClick() {
    createNewShow();
    openDetails();
  }

  function handleDelete() {
    dispatch(deleteShows(checkedItemIds));
    dispatch(resetChecked());
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
