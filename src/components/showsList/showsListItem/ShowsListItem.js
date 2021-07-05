import React from 'react';
import clsx from 'clsx';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

import useStyles from './ShowsListItemStyles';

export default function ShowsListItem(props) {
  const classes = useStyles();

  const { i, show, isChecked, selectShow, openDetails, handleCheck } = props;
  const { id, title, season, episode, status, note, tags } = show;

  function handleShowClick() {
    selectShow(show);
    openDetails();
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

      <TableCell onClick={handleShowClick}>{title}</TableCell>

      <TableCell onClick={handleShowClick} align='center'>{season}</TableCell>

      <TableCell onClick={handleShowClick} align='center'>{episode}</TableCell>

      <TableCell onClick={handleShowClick} align='center'>{status}</TableCell>

      <TableCell onClick={handleShowClick} align='center'>{formattedTags()}</TableCell>

      <TableCell onClick={handleShowClick} align='center'>{note}</TableCell>
    </TableRow>
  );
}
