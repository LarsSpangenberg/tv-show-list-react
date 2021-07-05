import React from 'react';
import clsx from 'clsx';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

import useStyles from './ShowsListItemStyles';
import NumberTableCell from './NumberTableCell';

export default function ShowsListItem(props) {
  const classes = useStyles();

  const {
    i,
    show,
    isChecked,
    selectShow,
    openDetails,
    handleCheck,
    handleIncDec,
  } = props;

  const { id, title, season, episode, status, note, tags } = show;

  function handleShowClick(e) {
    const focusField = e.target.getAttribute('name');
    selectShow({ ...show, focusField });
    openDetails();
  }

  function handleIncDecClick(field, isIncrementing) {
    handleIncDec({ id, field, isIncrementing });
  }

  function handleCheckClick(e) {
    handleCheck({ i, isChecked: e.target.checked });
  }

  function formattedTags() {
    let tagText = '';

    if (tags) {
      const lastIndex = tags.length - 1;

      tags.forEach((tag, i) => {
        tagText += tag;
        if (i !== lastIndex) tagText += ', ';
      });
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
        {formattedTags()}
      </TableCell>

      <TableCell name='note' onClick={handleShowClick} align='center'>
        {note}
      </TableCell>
    </TableRow>
  );
}
