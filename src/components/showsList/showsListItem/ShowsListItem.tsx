import { FC, ChangeEvent } from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import NumberTableCell from './NumberTableCell';

import { Show, ShowAndFocusfield } from 'store/user-data/ShowDetailsSlice';
import { CheckedItem } from 'store/app-data/CheckedListItemsSlice';
import { IncDecDto } from 'store/user-data/ShowsSlice';

import useStyles from './ShowsListItemStyles';

interface ShowsListItemProps {
  i: number;
  show: Show;
  isChecked: boolean;
  handleClick: (payload: ShowAndFocusfield) => void;
  handleCheck: (payload: CheckedItem) => void;
  handleIncDec: (payload: IncDecDto) => void;
}

const ShowsListItem: FC<ShowsListItemProps> = ({
  i,
  show,
  show: { id, title, season, episode, status, note, tags },
  isChecked,
  handleClick,
  handleCheck,
  handleIncDec,
}) => {
  const classes = useStyles();

  function handleShowClick(name: string) {
    handleClick({ show, focusField: name });
  }

  function handleIncDecClick(field: keyof Show, isIncrementing: boolean) {
    handleIncDec({ id, field, isIncrementing });
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
    <TableRow key={id} className={classes.root}>
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
        name='season'
        onClick={handleShowClick.bind(null, 'season')}
        handleIncDec={handleIncDecClick}
      >
        {season}
      </NumberTableCell>

      <NumberTableCell
        name='episode'
        onClick={handleShowClick.bind(null, 'episode')}
        handleIncDec={handleIncDecClick}
      >
        {episode}
      </NumberTableCell>

      <TableCell onClick={handleShowClick.bind(null, 'status')} align='center'>
        {status /* {getFormattedStatus()} */}
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
