

import Popular from "@/pages/popular";
import { createElement, lazy } from "react";
const Battle = lazy(()=>import("@/pages/battle"));
const BattleResult = lazy(()=>import("@/pages/battle-result"));


const LayoutRouter = [
  {
    path: "/popular",
    element: createElement(Popular),
    loader: () => import("@/pages/popular"),
    meta: {
      title: 'Popular',
    },
  },
  {
    path: '/battle',
    element: createElement(Battle),
    loader: () => import("@/pages/battle"),
    meta: {
      title: 'Battle'
    },
    children: [
      {
        path: '/battle/result',
        element: createElement(BattleResult),
        meta: {
          title: 'Battle Result'
        }
      }
    ]
  },

]

export default LayoutRouter;