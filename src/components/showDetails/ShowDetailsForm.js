import React from 'react';
import { Grid, TextField, MenuItem } from '@material-ui/core';

export default function ShowDetailsForm(props) {
  const { showDetails, handleChange } = props;
  const { title, status, season, episode, note } = showDetails;

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
