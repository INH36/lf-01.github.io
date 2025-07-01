import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import PageLoading from '@/components/page-loading';
import 'nprogress/nprogress.css'

/**
 * 路由监听器组件
 * 
 * 职责：
 * 1. 提供RouterProvider，负责整个应用的路由配置
 * 2. 路由监听功能通过RouteChangeListener组件实现，已在routes/index.ts中集成
 * 
 */

const RouterListener: React.FC = () => {

  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="flex items-center justify-center h-screen">
          <PageLoading />
        </div>
      }
    />
  );
};

export default RouterListener;
