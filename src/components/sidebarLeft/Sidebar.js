import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ClickAwayListener, Drawer } from '@material-ui/core';
import * as uiActions from 'store/UiSlice';

import useStyles from './SidebarStyles';

export default function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  function closeSidebar() {
    if (isSidebarOpen) dispatch(uiActions.closeSidebar());
  }

  return (
    <ClickAwayListener
      onClickAway={closeSidebar}
      mouseEvent='onMouseUp'
      touchEvent='onTouchEnd'
    >
      <Drawer open={isSidebarOpen} variant='persistent' anchor='left'>
        <div className={classes.logoBg} />
      </Drawer>
    </ClickAwayListener>
  );
}
