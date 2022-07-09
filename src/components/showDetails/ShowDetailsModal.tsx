import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ShowDetailsForm from './showDetailsForm/ShowDetailsForm';

import {
  updateSelection,
  resetSelection as resetShowDetailsForm,
  DetailsFormInputValue,
} from 'store/app-data/ShowDetailsSlice';
import {
  useAddShowMutation,
  useAddTagMutation,
  useDeleteShowsMutation,
  useGetAllTagsQuery,
  useUpdateShowMutation,
} from 'store/api';

interface ShowDetailsModalProps {
  open: boolean;
  handleClose: () => void;
}

const ShowDetailsModal: FC<ShowDetailsModalProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();

  const { show, isNew, focusField } = useAppSelector(
    (state) => state.showDetails
  );

  // TODO: add Error handling
  const { data: allTags } = useGetAllTagsQuery();
  const [saveNewShow] = useAddShowMutation();
  const [updateShow] = useUpdateShowMutation();
  const [deleteShow] = useDeleteShowsMutation();
  const [createNewTag, { isSuccess: newTagIsSuccess, data: newTagData }] =
    useAddTagMutation();

  const handleReset = () => dispatch(resetShowDetailsForm());

  function closeModal() {
    handleClose();
    handleReset();
  }

  function handleDetailChange(key: string, value: DetailsFormInputValue) {
    dispatch(updateSelection({ key, value }));
  }

  function handleTagChange(newTagIds: string[]) {
    handleDetailChange('tags', newTagIds);
  }

  function handleSave() {
    if (isNew) {
      saveNewShow(show);
    } else if ('id' in show) {
      updateShow(show);
    } else {
      console.log(
        "Show was not updated, probably because it doesn't have an ID property."
      );
    }
    closeModal();
  }

  function handleDelete() {
    if (!isNew && 'id' in show) {
      deleteShow(show.id);
    }
    closeModal();
  }

  // TODO: Very slow. Maybe just create the whole tag with id clientside and update without waiting on server
  // once new global tag is created, add it to the show's tags in ShowDetailsSlice
  useEffect(() => {
    if (newTagIsSuccess && newTagData) {
      handleTagChange([...show.tags, newTagData.id]);
    }
  }, [newTagIsSuccess, newTagData]);

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      maxWidth='sm'
      fullWidth
      sx={{ overflow: 'hidden' }}
    >
      <DialogTitle
        component='div'
        display='flex'
        justifyContent='space-between'
        sx={{
          bgcolor: 'primary.main',
          py: 1,
          pr: 1,
        }}
      >
        <Typography variant='h6' my='auto'>
          {isNew ? 'New' : 'Edit'} Show
        </Typography>

        <Box component={IconButton} onClick={handleClose} aria-label='close'>
          <CloseIcon />
        </Box>
      </DialogTitle>

      <ShowDetailsForm
        showDetails={show}
        allTags={allTags ?? []}
        focusField={focusField}
        handleChange={handleDetailChange}
        handleTagChange={handleTagChange}
        createNewTag={createNewTag}
      />

      <DialogActions>
        {!isNew && (
          <Button color='error' onClick={handleDelete}>
            Delete
          </Button>
        )}

        <Button
          onClick={handleSave}
          variant='contained'
          color='primary'
          disableElevation
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowDetailsModal;
