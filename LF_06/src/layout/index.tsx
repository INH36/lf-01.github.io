import React from 'react';
import { Outlet } from 'react-router';
import Header from './modules/header';

const Layout: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
      <header className='h-12'>
        <Header />
      </header>
      <aside></aside>
      <main className='w-screen h-[calc(100%-48px)] overflow-hidden'>
        <Outlet />
      </main>
    </div >
  );
};

export default Layout;
