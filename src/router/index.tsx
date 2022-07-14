import { RouteObject } from 'react-router-dom'
import Home from '@/views/home/index';
import Music from '@/views/music';
import Info from '@/views/music/info';

const routes: RouteObject[] = [
    {
        path: '/',
        element:<Home />,
    },
    {
        path: '/music',
        element: <Music />,
        children: [{
            path: '/music/:id',
            element: <Info />
        }]
    },
    {
        path: "*",
        element: <Home />,
      },
];

export default routes;
