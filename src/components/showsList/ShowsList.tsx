import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
  Container,
  Paper,
  Table,
  TableContainer,
  TableBody,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ShowsListToolbar from 'components/showsList/ShowsListToolbar';
import ShowsListHead from 'components/showsList/ShowsListHead';
import ShowsListItem from 'components/showsList/showsListItem/ShowsListItem';
import ShowDetailsModal from 'components/showDetails/ShowDetailsModal';
import EmptyListMessage from './EmptyListMessage';

import { ShowAndFocusfield } from 'store/app-data/ShowDetailsSlice';

import * as uiActions from 'store/app-data/UiSlice';
import {
  createNewShow as createNew,
  selectShow as select,
} from 'store/app-data/ShowDetailsSlice';
import {
  toggleCheck,
  toggleCheckAll,
  resetChecked,
  CheckedItem,
  reevaluateChecked,
} from 'store/app-data/CheckedListItemsSlice';
import {
  // getFilteredShows,
  getIsAnyFilterActive,
  resetAllFilters,
  // getAllFilters
} from 'store/app-data/FiltersSlice';
import {
  useDeleteShowsMutation,
  useGetAllShowsQuery,
  useUpdateShowFieldMutation,
} from 'store/api';
import { Show } from 'store/models/Show';

const ShowsList: FC = () => {
  const dispatch = useAppDispatch();

  const tagFilters = useAppSelector((state) => state.filters.selectedTagIds);
  const statusFilter = useAppSelector((state) => state.filters.status);
  const { isSidebarOpen } = useAppSelector((state) => state.ui);

  // TODO: add error handling and a loading spinner
  const { data: shows } = useGetAllShowsQuery({
    statusFilter,
    tagFilters,
  });

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

  // prevent sidebar from closing when clicking buttons (resetFilters)
  useEffect(() => {
    if (isSidebarOpen !== wasSidebarOpen) {
      setTimeout(() => {
        setWasSidebarOpen(isSidebarOpen);
      }, 500);
    }
  }, [isSidebarOpen]);

  // reset checkboxes when a new filter is selected or removed
  useEffect(() => {
    if (shows) {
      resetCheckedItems(shows);
    }
  }, [tagFilters, statusFilter, shows]);

  const [deleteShows] = useDeleteShowsMutation();
  const [updateShowField] = useUpdateShowFieldMutation();
  const createNewShow = (tags: string[]) => dispatch(createNew(tags));
  const selectShow = (payload: ShowAndFocusfield) => dispatch(select(payload));
  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);
  const openSidebar = () => dispatch(uiActions.openSidebar());

  const handleCheckAll = () =>
    dispatch(toggleCheckAll((shows || []) as Show[]));

  const resetCheckedItems = (fetchedShows: Show[]) =>
    dispatch(reevaluateChecked(fetchedShows));

  const handleItemCheck = (payload: CheckedItem) =>
    dispatch(toggleCheck(payload));

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
    deleteShows(checkedItemIds);
    dispatch(resetChecked());
  }

  return (
    <>
      <Container
        sx={({
          spacing,
          dimensions: { sidebarWidth },
          transitions: { create, duration, easing },
        }) => ({
          my: '50px',
          transition: create('padding', {
            duration: duration.short,
            easing: easing.easeOut,
          }),
          '&.MuiContainer-root': {
            pl: isSidebarOpen
              ? (sidebarWidth as number) + parseInt(spacing(3)) + 'px'
              : 3,
          },
        })}
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
              rowsCount={shows ? shows.length : 0}
              handleCheckAll={handleCheckAll}
            />

            <TableBody>
              {shows &&
                shows.map((show, i) => (
                  <ShowsListItem
                    i={i}
                    key={show.id}
                    show={show}
                    isChecked={selectedShows[i] || false}
                    handleClick={handleShowClick}
                    handleCheck={handleItemCheck}
                    updateSeasonOrEpisode={updateShowField}
                  />
                ))}
            </TableBody>
          </Table>

          {(!shows || shows.length === 0) && (
            <EmptyListMessage
              isAnyFilterActive={isAnyFilterActive}
              handleClick={handleCreateNewShowClick}
            />
          )}
        </TableContainer>
      </Container>

      {/*
       TODO: When many Shows and scrollbar appears, FAB will stay in position when scrolling down and it looks stupid.
        Either make FAB stick or make showslist scroll inside the component instead of whole page. 
      */}
      <Fab
        onClick={handleCreateNewShowClick}
        color='secondary'
        sx={{
          position: 'absolute',
          right: '2%',
          bottom: '5vh',
        }}
      >
        <AddIcon />
      </Fab>

      <ShowDetailsModal open={isDetailsOpen} handleClose={closeDetails} />
    </>
  );
};

export default ShowsList;
