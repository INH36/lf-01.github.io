import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import route from '@/routes/route'

const Layout: React.FC = () => {
  const loac = useLocation()
  const nav = useNavigate()
  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
      <header className='w-full h-16 flex items-center justify-center'>
        <div className='w-4/5 h-full flex items-center gap-6'>
          {
            route.map(item => {
              return (
                <div
                  key={item.path}
                  className={
                    `cursor-pointer hover:text-[#bc574b] duration-200 transition-all
                     ${loac.pathname === item.path ? 'text-[#bc574b]' : 'text-black'}`
                  }
                  onClick={() => nav(item.path)}
                >
                  <span>{item.meta.title}</span>
                </div>
              )
            })
          }
        </div>

      </header>
      <aside></aside>
      <main className='w-full h-full'>
        <Outlet />
      </main>
    </div >
  );
};

export default Layout;
