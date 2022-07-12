import { RouteObject } from 'react-router-dom'
import Home from '@/views/home/index';
import Name from '@/views/name';
import Article from '@/views/article';

const routes: RouteObject[] = [
    {
        path: '/',
        element:<Home />,
    },
    {
        path: '/name',
        element:<Name />,
        children: [{
            path: '/name/:id',
            element: <>1</>
        }]
    },
    {
        path: '/article',
        element: <Article />,
    },
    {
        path: "*",
        element: <Home />,
      },
];

export default routes;
