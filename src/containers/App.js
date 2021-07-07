import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from 'components/header/Header';
import ShowsTable from 'components/showsList/ShowsList';

import useStyles from './AppStyles';

import { user } from 'assets/mock-user.js';
import * as actions from 'store/ShowsSlice';

export default function App() {
  useStyles();
  const dispatch = useDispatch();

  const shows = useSelector((state) => state.shows);

  useEffect(() => {
    const addShow = (show) => dispatch(actions.addShow(show));

    user.shows.forEach((show) => {
      const i = shows.findIndex((el) => el.id === show.id);

      if (i === -1) {
        console.log(show);
        addShow(show);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <ShowsTable shows={shows} />
    </div>
  );
}
