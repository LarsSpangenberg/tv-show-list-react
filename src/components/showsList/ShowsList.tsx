import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
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

import { ShowAndFocusfield } from 'store/user-data/ShowDetailsSlice';

import useStyles from './ShowsListStyles';

import * as uiActions from 'store/app-data/UiSlice';
import * as detailsActions from 'store/user-data/ShowDetailsSlice';
import {
  updateSeasonOrEpisode,
  deleteShows,
  IncDecDto,
} from 'store/user-data/ShowsSlice';
import {
  toggleCheck,
  toggleCheckAll,
  resetChecked,
  CheckedItem,
  reevaluateChecked,
} from 'store/app-data/CheckedListItemsSlice';
import {
  getFilteredShows,
  getIsAnyFilterActive,
  resetAllFilters,
} from 'store/app-data/FiltersSlice';

const ShowsList: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const shows = useAppSelector((state) => state.shows);
  const tagFilters = useAppSelector((state) => state.filters.tags);
  const { isSidebarOpen } = useAppSelector((state) => state.ui);
  const filteredShows = useAppSelector((state) => getFilteredShows(state));

  const checkedItemIds = useAppSelector(
    (state) => state.checkedListItems.checkedIds
  );

  const isAnyFilterActive = useAppSelector((state) =>
    getIsAnyFilterActive(state)
  );

  const { numChecked, checked: selectedShows } = useAppSelector(
    (state) => state.checkedListItems
  );

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [wasSidebarOpen, setWasSidebarOpen] = useState(isSidebarOpen);

  // used as alternative to prevent sidebar from closing when clicking buttons (resetFilters)
  useEffect(() => {
    if (isSidebarOpen !== wasSidebarOpen) {
      setTimeout(() => {
        setWasSidebarOpen(isSidebarOpen);
      }, 500);
    }
  }, [isSidebarOpen]);

  // reset checkboxes when a new filter is selected or removed
  useEffect(() => {
    resetCheckedItems();
  }, [filteredShows]);

  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);
  const handleCheckAll = () => dispatch(toggleCheckAll(shows));
  const openSidebar = () => dispatch(uiActions.openSidebar());
  const resetCheckedItems = () => dispatch(reevaluateChecked(filteredShows));

  const createNewShow = (tags: string[]) =>
    dispatch(detailsActions.createNewShow(tags));

  const selectShow = (payload: ShowAndFocusfield) =>
    dispatch(detailsActions.selectShow(payload));

  const handleItemCheck = (payload: CheckedItem) =>
    dispatch(toggleCheck(payload));

  const handleIncDec = (payload: IncDecDto) =>
    dispatch(updateSeasonOrEpisode(payload));

  function resetFilters() {
    if (wasSidebarOpen) openSidebar();
    dispatch(resetAllFilters());
  }

  function handleShowClick(payload: ShowAndFocusfield) {
    selectShow(payload);
    openDetails();
  }

  function handleCreateNewShowClick() {
    createNewShow(tagFilters);
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
            isAnyFilterActive={isAnyFilterActive}
            handleDelete={handleDelete}
            handleFilterClick={openSidebar}
            resetFilters={resetFilters}
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
};

export default ShowsList;
