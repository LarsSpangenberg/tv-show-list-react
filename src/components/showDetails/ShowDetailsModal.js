import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Slide,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './ShowDetailsModalStyles';
import ShowDetailsForm from './ShowDetailsForm';
import { updateSelection, resetSelection } from 'store/ShowDetailsSlice';
import * as actions from 'store/ShowsSlice';

export default function ShowDetailsModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { open, handleClose } = props;
  const { isNew, ...showDetails } = useSelector((state) => state.showDetails);

  const handleDetailChange = (e) =>
    dispatch(updateSelection({ [e.target.name]: e.target.value }));
  const saveNewShow = () => dispatch(actions.addShow(showDetails));
  const updateShow = () => dispatch(actions.updateShow(showDetails));
  const deleteShow = () => dispatch(actions.deleteShow(showDetails.id));
  const handleReset = () => dispatch(resetSelection);

  function closeModal() {
    handleClose();
    handleReset();
  }

  function handleSave() {
    if (isNew) saveNewShow(showDetails);
    else updateShow(showDetails);
    closeModal();
  }

  function handleDelete() {
    if (!isNew) deleteShow();
    closeModal();
  }

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      TransitionComponent={Slide}
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

      <DialogContent className={classes.content}>
        <ShowDetailsForm
          showDetails={showDetails}
          handleChange={handleDetailChange}
        />
      </DialogContent>

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
}
