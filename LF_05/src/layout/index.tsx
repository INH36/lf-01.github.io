import React from 'react';
import { Outlet } from 'react-router';

const Layout: React.FC = () => {
  return (
    <>
      <header></header>
      <aside></aside>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
