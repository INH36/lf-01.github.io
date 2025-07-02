import Battle from "@/pages/battle";
import Popular from "@/pages/popular";
import { createElement } from "react";


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
    loader: ()=> import("@/pages/battle"),
    meta: {
      title: 'Battle'
    }
  }
]

export default LayoutRouter;