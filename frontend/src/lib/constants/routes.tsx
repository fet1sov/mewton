import { AdminAddBoosts } from '@/pages/Admin/AddBoosts';
import { AdminBoosts } from '@/pages/Admin/Boosts';
import { AdminTasks } from '@/pages/Admin/Tasks';
import Boost from '@/pages/Boost';
import { Friends } from '@/pages/Friends';
import { Info } from '@/pages/Info';
import { Main } from '@/pages/Main';
import { Tasks } from '@/pages/Tasks';
import { Wallet } from '@/pages/Wallet';
import { Welcome } from '@/pages/Welcome';
import { SecondPage } from '@/pages/Welcome2';
import { ThirdPage } from '@/pages/Welcome3';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <Main />,
  },
  {
    path: '/boost',
    index: true,
    element: <Boost />,
  },
  {
    path: '/tasks',
    index: true,
    element: <Tasks />,
  },
  {
    path: '/friends',
    index: true,
    element: <Friends />,
  },
  {
    path: '/info',
    index: true,
    element: <Info />,
  },
  {
    path: '/wallet',
    index: true,
    element: <Wallet />,
  },
  {
    path: '/welcome',
    index: true,
    element: <Welcome />,
  },
  {
    path: '/welcome2',
    index: true,
    element: <SecondPage />,
  },
  {
    path: '/welcome3',
    index: true,
    element: <ThirdPage />,
  },
  {
    path: '/admin',
    children: [
      {
        path: '/admin/boosts',
        index: true,
        element: <AdminBoosts />,
      },
      {
        path: '/admin/boosts/add',
        index: true,
        element: <AdminAddBoosts />,
      },
      {
        path: '/admin/tasks',
        index: true,
        element: <AdminTasks />,
      },
    ],
  },
];
