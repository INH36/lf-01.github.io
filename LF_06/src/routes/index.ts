import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "@/pages/error";
import Home from "@/pages/home";
import LazyComponent from "@/components/lazy-components";
import PageLoading from "@/components/page-loading";

// 创建带有导航事件监听的路由
const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(LazyComponent, {
      importComponent: () => import('@/layout') as any,
      fallback: createElement(PageLoading)
    }),
    children: [
      {
        path: "/",
        element: createElement(Home),
      },
    ],
  },
  {
    path: "*",
    element: createElement(Error),
  }
]);


export default router;