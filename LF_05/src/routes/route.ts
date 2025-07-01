import { createElement, lazy } from "react";
const Home = lazy(() => import("@/pages/home"));


const LayoutRouter = [
  {
    path: "/",
    element: createElement(Home),
    loader: () => import("@/pages/home"),
    meta: {
      title: '首页',
      icon: 'home'
    },
  },
]

export default LayoutRouter;