import { FC } from 'react';
import Header from 'components/header/Header';
import ShowsList from 'components/showsList/ShowsList';
import Sidebar from 'components/sidebarLeft/Sidebar';

const App: FC = () => {
  return (
    <>
      <Header />
      <ShowsList />
      <Sidebar />
    </>
  );
}

export default App;
