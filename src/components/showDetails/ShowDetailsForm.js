import React, { useRef, useEffect } from 'react';
import { Grid, TextField, MenuItem } from '@material-ui/core';

export default function ShowDetailsForm(props) {
  const { showDetails, focusField, handleChange } = props;
  const { title, status, season, episode, note } = showDetails;

  const titleInput = useRef();
  const statusInput = useRef();
  const seasonInput = useRef();
  const episodeInput = useRef();
  const noteInput = useRef();

  useEffect(() => {
    switch(focusField) {
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
      case 'title':
      default:
        titleInput.current.focus();
        break;
    }
  }, [focusField]);

  return (
    <form noValidate autoComplete='off'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id='sd-title'
            label='Title'
            name='title'
            value={title}
            onChange={handleChange}
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
            onChange={handleChange}
            inputRef={statusInput}
            fullWidth
          >
            <MenuItem value='current'>Currently Watching</MenuItem>
            <MenuItem value='completed'>Completed</MenuItem>
            <MenuItem value='plan to watch'>Plan to Watch</MenuItem>
            <MenuItem value='on hold'>On Hold</MenuItem>
            <MenuItem value='dropped'>Dropped</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            id='sd-season'
            type='number'
            label='Season'
            name='season'
            value={season}
            onChange={handleChange}
            inputRef={seasonInput}
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
            onChange={handleChange}
            inputRef={episodeInput}
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
            onChange={handleChange}
            inputRef={noteInput}
            variant='outlined'
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </form>
  );
}
