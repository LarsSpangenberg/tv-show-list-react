import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import useStyles from './ShowDetailsModalStyles';

import * as actions from 'store/userData/ShowsSlice';
import {
  updateSelection,
  resetSelection,
} from 'store/userData/ShowDetailsSlice';
import { createTag } from 'store/userData/TagsSlice';

const Transition = forwardRef((props, ref) => (
  <Slide ref={ref} {...props} />
));

export default function ShowDetailsModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { open, handleClose } = props;
  const { isNew, focusField, ...showDetails } = useSelector(
    (state) => state.showDetails
  );
  const allTags = useSelector((state) => state.tags);

  const saveNewShow = () => dispatch(actions.addShow(showDetails));
  const updateShow = () => dispatch(actions.updateShow(showDetails));
  const deleteShow = () => dispatch(actions.deleteShow(showDetails.id));
  const createNewTag = (tag) => dispatch(createTag(tag));
  const handleReset = () => dispatch(resetSelection);

  function handleDetailChange(key, value) {
    dispatch(updateSelection({ [key]: value }));
  }

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
      className={classes.root}
      open={open}
      onClose={closeModal}
      TransitionComponent={Transition}
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
        showDetails={showDetails}
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
}
