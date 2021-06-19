import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ShowsTable from "components/showsTable/ShowsTable";

import { user } from "assets/mock-user.js";
import * as actions from "store/shows";

export default function App() {
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
    <div className='App'>
      <ShowsTable shows={shows} />
    </div>
  );
}
