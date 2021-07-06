import React from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

import useStyles from './ShowsListItemStyles';
import NumberTableCell from './NumberTableCell';

export default function ShowsListItem(props) {
  const classes = useStyles();

  const {
    i,
    show,
    isChecked,
    handleClick,
    handleCheck,
    handleIncDec,
  } = props;

  const { id, title, season, episode, status, note, tags } = show;

  function handleShowClick(e) {
    const focusField = e.target.getAttribute('name');
    handleClick({ ...show, focusField });
  }

  function handleIncDecClick(field, isIncrementing) {
    handleIncDec({ id, field, isIncrementing });
  }

  function handleCheckClick(e) {
    handleCheck({ i, isChecked: e.target.checked });
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
      };
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

      <TableCell name='title' onClick={handleShowClick}>
        {title}
      </TableCell>

      <NumberTableCell
        name='season'
        onClick={handleShowClick}
        handleIncDec={handleIncDecClick}
      >
        {season}
      </NumberTableCell>

      <NumberTableCell
        name='episode'
        onClick={handleShowClick}
        handleIncDec={handleIncDecClick}
      >
        {episode}
      </NumberTableCell>

      <TableCell name='status' onClick={handleShowClick} align='center'>
        {status}
      </TableCell>

      <TableCell name='tags' onClick={handleShowClick} align='center'>
        {getFormattedTags()}
      </TableCell>

      <TableCell name='note' onClick={handleShowClick} align='center'>
        {note}
      </TableCell>
    </TableRow>
  );
}
