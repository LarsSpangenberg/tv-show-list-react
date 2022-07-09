import { FC, ChangeEvent } from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import NumberTableCell from './NumberTableCell';

import { ShowAndFocusfield } from 'store/app-data/ShowDetailsSlice';
import { CheckedItem } from 'store/app-data/CheckedListItemsSlice';
import { UpdateShowFieldDTO } from 'store/api';
import { Show } from 'store/models/Show';

interface ShowsListItemProps {
  i: number;
  show: Show;
  isChecked: boolean;
  handleClick: (payload: ShowAndFocusfield) => void;
  handleCheck: (payload: CheckedItem) => void;
  updateSeasonOrEpisode: (payload: UpdateShowFieldDTO) => void;
}

const ShowsListItem: FC<ShowsListItemProps> = ({
  i,
  show,
  show: { id, title, season, episode, status, note, tags },
  isChecked,
  handleClick,
  handleCheck,
  updateSeasonOrEpisode,
}) => {

  function handleShowClick(name: string) {
    handleClick({ show, focusField: name });
  }

  function submitIncDecValue(field: 'season' | 'episode', updatedValue: number) {
    updateSeasonOrEpisode({ id, field, updatedValue });
  }

  function handleCheckClick(e: ChangeEvent<HTMLInputElement>) {
    handleCheck({ i, isChecked: e.target.checked, id });
  }

  function getFormattedTags() {
    let tagText = '';

    if (tags) {
      const lastIndex = tags.length - 1;

      for (let i = 0; i < tags.length; i++) {
        if (i > 2) {
          tagText += '...';
          break;
        }

        tagText += tags[i];
        if (i !== lastIndex && i < 2) tagText += ', ';
      }
    }

    return tagText;
  }

  return (
    <TableRow
      key={id}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckClick}
          color='default'
        />
      </TableCell>

      <TableCell onClick={handleShowClick.bind(null, 'title')}>
        {title}
      </TableCell>

      <NumberTableCell
        value={season}
        onClick={handleShowClick.bind(null, 'season')}
        updateValue={submitIncDecValue.bind(null, 'season')}
      />

      <NumberTableCell
        value={episode}
        onClick={handleShowClick.bind(null, 'episode')}
        updateValue={submitIncDecValue.bind(null, 'episode')}
      />

      <TableCell onClick={handleShowClick.bind(null, 'status')} align='center'>
        {status}
      </TableCell>

      <TableCell onClick={handleShowClick.bind(null, 'tags')} align='center'>
        {getFormattedTags()}
      </TableCell>

      <TableCell onClick={handleShowClick.bind(null, 'note')} align='center'>
        {note}
      </TableCell>
    </TableRow>
  );
};

export default ShowsListItem;
