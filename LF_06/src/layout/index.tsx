import React from 'react';
import Header from './modules/header';
import Home from '@/pages/home';

const Layout: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
      <header className='h-12'>
        <Header />
      </header>
      <aside></aside>
      <main className='w-screen h-[calc(100%-48px)] overflow-hidden'>
        <Home />
      </main>
    </div >
  );
};

export default Layout;
