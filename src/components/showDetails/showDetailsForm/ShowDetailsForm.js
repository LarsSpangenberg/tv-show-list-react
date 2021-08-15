import { useRef, useEffect } from 'react';
import { Grid, DialogContent, TextField, MenuItem } from '@material-ui/core';

import TagInput from './TagInput';

import useStyles from './ShowDetailsFormStyles';

import {
  CURRENT,
  COMPLETED,
  PLAN_TO_WATCH,
  ON_HOLD,
  DROPPED,
} from 'constants/statusValues';

export default function ShowDetailsForm({
  showDetails: { title, status, season, episode, note, tags },
  allTags,
  focusField,
  handleChange,
  createNewTag,
}) {
  const classes = useStyles();

  const titleInput = useRef();
  const statusInput = useRef();
  const seasonInput = useRef();
  const episodeInput = useRef();
  const noteInput = useRef();
  const tagInput = useRef();

  useEffect(() => {
    switch (focusField) {
      case 'status':
        setTimeout(() => {
          statusInput.current.focus();
        }, 100);
        break;
      case 'season':
        seasonInput.current.focus();
        break;
      case 'episode':
        episodeInput.current.focus();
        break;
      case 'note':
        noteInput.current.focus();
        break;
      case 'tags':
        tagInput.current.focus();
        break;
      case 'title':
      default:
        titleInput.current.focus();
        break;
    }
  }, [focusField]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  function handleTagChange(updatedTags) {
    handleChange('tags', updatedTags);
  }

  return (
    <form noValidate autoComplete='off'>
      <DialogContent className={classes.contentTop}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='sd-title'
              label='Title'
              name='title'
              value={title}
              onChange={handleInputChange}
              inputRef={titleInput}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              id='sd-status'
              label='Status'
              name='status'
              value={status}
              onChange={handleInputChange}
              inputRef={statusInput}
              fullWidth
            >
              <MenuItem value={CURRENT}>Currently Watching</MenuItem>
              <MenuItem value={COMPLETED}>Completed</MenuItem>
              <MenuItem value={PLAN_TO_WATCH}>Plan to Watch</MenuItem>
              <MenuItem value={ON_HOLD}>On Hold</MenuItem>
              <MenuItem value={DROPPED}>Dropped</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogContent className={classes.contentBottom}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id='sd-season'
              type='number'
              label='Season'
              name='season'
              value={season}
              onChange={handleInputChange}
              inputRef={seasonInput}
              variant='outlined'
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id='sd-episode'
              type='number'
              label='Episode'
              name='episode'
              value={episode}
              onChange={handleInputChange}
              inputRef={episodeInput}
              variant='outlined'
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='sd-note'
              label='Note'
              name='note'
              value={note}
              onChange={handleInputChange}
              inputRef={noteInput}
              variant='outlined'
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TagInput
              allTags={allTags}
              showTags={tags}
              handleChange={handleTagChange}
              createNewTag={createNewTag}
              inputRef={tagInput}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </form>
  );
}
