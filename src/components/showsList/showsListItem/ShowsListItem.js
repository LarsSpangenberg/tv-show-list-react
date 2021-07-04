import React from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

import useStyles from './ShowsListItemStyles';

export default function ShowsListItem(props) {
  const classes = useStyles();

  const { show, isChecked, selectShow, openDetails, handleCheck } = props;
  const { id, title, season, episode, status, note, tags } = show;

  function handleShowClick() {
    selectShow(show);
    openDetails();
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
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </TableCell>

      <TableCell onClick={handleShowClick}>{title}</TableCell>

      <TableCell onClick={handleShowClick}>{season}</TableCell>

      <TableCell onClick={handleShowClick}>{episode}</TableCell>

      <TableCell onClick={handleShowClick}>{status}</TableCell>

      <TableCell onClick={handleShowClick}>{formattedTags()}</TableCell>

      <TableCell onClick={handleShowClick}>{note}</TableCell>
    </TableRow>
  );
}
