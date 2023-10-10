import React from 'react';

import './MainLayout.scss';

import { Footer } from '../Footer/Footer';
export const MainLayout: React.FC<MainLayout> = ({ header: Header, children }) => {
  return (
    <div className="main-layout">
      <div className="main-layout__header">{Header}</div>
      <div className="main-layout__height"></div>
      <div className="main-layout__content">{children}</div>
      {/* <div className="main-layout__sidebar">{<Sidebar />}</div> */}
      {/* <div className="main-layout__footer">
       {<Footer />}
      </div> */}
    </div>
  );
};
