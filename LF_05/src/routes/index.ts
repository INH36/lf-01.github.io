import Layout from '@/layout';
import { createElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LayoutRouter from './route';
import Error from '@/pages/error';
import Home from '@/pages/home';

// 创建带有导航事件监听的路由
const router = createBrowserRouter([
	{
		path: '/',
		element: createElement(Layout),
		children: [
			{
				path: '/',
				element: createElement(Home),
				loader: () => import('@/pages/home'),
			},
			...LayoutRouter,
		],
	},
	{
		path: '*',
		element: createElement(Error),
	},
]);

export default router;
