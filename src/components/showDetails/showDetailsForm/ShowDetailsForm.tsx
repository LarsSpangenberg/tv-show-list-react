import { FC, useRef, useEffect, ChangeEvent, MutableRefObject } from 'react';
import {
  Grid,
  DialogContent,
  TextField,
  MenuItem,
  lighten,
  Box,
} from '@mui/material';

import TagInput from './TagInput';

import Status from 'store/models/ShowStatus';
import { DetailsFormInputValue, ShowDetailsData } from 'store/app-data/ShowDetailsSlice';
import { Tag } from 'store/models/Tag';

interface ShowDetailsFormProps {
  allTags: Tag[];
  showDetails: ShowDetailsData;
  focusField: string;
  handleChange: (name: string, value: DetailsFormInputValue) => void;
  handleTagChange: (newTagIds: string[]) => void;
  createNewTag: (tag: string) => void;
}

const ShowDetailsForm: FC<ShowDetailsFormProps> = ({
  showDetails: { title, status, season, episode, note },
  allTags,
  focusField,
  handleChange,
  handleTagChange,
  createNewTag,
}) => {
  const titleInput = useRef<HTMLInputElement>();
  const statusInput = useRef<HTMLInputElement>();
  const seasonInput = useRef<HTMLInputElement>();
  const episodeInput = useRef<HTMLInputElement>();
  const noteInput = useRef<HTMLInputElement>();
  const tagInput = useRef<HTMLInputElement>();

  useEffect(() => {
    function focusInput(el: MutableRefObject<HTMLInputElement | undefined>) {
      if (el && el.current) {
        el.current.focus();
      }
    }

    switch (focusField) {
      case 'status':
        setTimeout(() => {
          focusInput(statusInput);
        }, 100);
        break;
      case 'season':
        focusInput(seasonInput);
        break;
      case 'episode':
        focusInput(episodeInput);
        break;
      case 'note':
        focusInput(noteInput);
        break;
      case 'tags':
        focusInput(tagInput);
        break;
      case 'title':
      default:
        focusInput(titleInput);
        break;
    }
  }, [focusField]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  return (
    <form noValidate autoComplete='off'>
      <Box
        component={DialogContent}
        pb={2}
        sx={({ palette }) => ({
          backgroundColor: lighten(palette.secondary.light, 0.4),
          overflowY: 'hidden',
        })}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='sd-title'
              label='Title'
              name='title'
              value={title}
              onChange={handleInputChange}
              inputRef={titleInput}
              variant='standard'
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
              variant='standard'
              fullWidth
            >
              <MenuItem value={Status.CURRENT}>Currently Watching</MenuItem>
              <MenuItem value={Status.COMPLETED}>Completed</MenuItem>
              <MenuItem value={Status.PLAN_TO_WATCH}>Plan to Watch</MenuItem>
              <MenuItem value={Status.ON_HOLD}>On Hold</MenuItem>
              <MenuItem value={Status.DROPPED}>Dropped</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Box component={DialogContent} height={225} pt={2} pr={2}>
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
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TagInput
              allTags={allTags}
              handleChange={handleTagChange}
              createNewTag={createNewTag}
              inputRef={tagInput}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ShowDetailsForm;
