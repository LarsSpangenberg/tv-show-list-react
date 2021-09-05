import { FC, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  IconButton,
  Slide,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import ShowDetailsForm from './showDetailsForm/ShowDetailsForm';

import { RootState } from 'store/store';

import useStyles from './ShowDetailsModalStyles';

import * as actions from 'store/userData/ShowsSlice';
import {
  updateSelection,
  resetSelection,
  DetailsFormInputValue,
} from 'store/userData/ShowDetailsSlice';
import { createTag } from 'store/userData/TagsSlice';


// TODO: const Transition = forwardRef((props, ref) => <Slide ref={ref} {...props} />);

interface ShowDetailsModalProps {
  open: boolean;
  handleClose: () => void;
}

const ShowDetailsModal: FC<ShowDetailsModalProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { show, isNew, focusField } = useAppSelector(
    (state) => state.showDetails
  );
  const allTags = useAppSelector((state: RootState) => state.tags);

  const saveNewShow = () => dispatch(actions.addShow(show));
  const updateShow = () => dispatch(actions.updateShow(show));
  const deleteShow = () => dispatch(actions.deleteShow(show.id));
  const createNewTag = (tag: string) => dispatch(createTag(tag));
  const handleReset = () => dispatch(resetSelection());

  function handleDetailChange(key: string, value: DetailsFormInputValue) {
    dispatch(updateSelection({ key, value }));
  }

  function closeModal() {
    handleClose();
    handleReset();
  }

  function handleSave() {
    if (isNew) saveNewShow();
    else updateShow();
    closeModal();
  }

  function handleDelete() {
    if (!isNew) deleteShow();
    closeModal();
  }

  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={closeModal}
      // TransitionComponent={Transition}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant='h6'>{isNew ? 'New' : 'Edit'} Show</Typography>

        <IconButton
          className={classes.closeButton}
          onClick={handleClose}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <ShowDetailsForm
        showDetails={show}
        allTags={allTags}
        focusField={focusField}
        handleChange={handleDetailChange}
        createNewTag={createNewTag}
      />

      <DialogActions>
        {!isNew && (
          <Button className={classes.deleteButton} onClick={handleDelete}>
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
