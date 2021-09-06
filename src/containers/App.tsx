import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import Header from 'components/header/Header';
import ShowsList from 'components/showsList/ShowsList';
import Sidebar from 'components/sidebarLeft/Sidebar';

import useStyles from './AppStyles';

import * as actions from 'store/userData/ShowsSlice';
import * as tagActions from 'store/userData/TagsSlice';

import { user } from 'assets/mock-user.js';
import { Show } from 'store/userData/ShowDetailsSlice';
import { getEqualStatusValue } from 'constants/showStatus';

const App: FC = () => {
  useStyles();
  const dispatch = useAppDispatch();

  const shows = useAppSelector((state) => state.shows);
  
  useEffect(() => {
    const addShow = (show: Show) => dispatch(actions.addShow(show));
    const createTag = (tag: string) => dispatch(tagActions.createTag(tag));

    user.shows.forEach((show) => {
      const i = shows.findIndex((el) => el.id === show.id);
      if (i === -1) {
        show.tags.forEach((tag) => createTag(tag));
        addShow({...show, status: getEqualStatusValue(show.status)});
      }
    });
  }, []);

  return (
    <>
      <Header />
      <ShowsList />
      <Sidebar />
    </>
  );
}

export default App;
