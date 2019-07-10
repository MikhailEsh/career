import React from 'react';
import Loadable from 'react-loadable';

import {
  HOME,
} from '@career/constants/routes';
import LoadingProgress from '@career/components/common/LoadingProgress';

const Loading = () => <LoadingProgress />;

const Home = Loadable({
  loader: () => import('@career/components/pages/Home'),
  loading: Loading,
});

const routes = [
  {
    path: HOME,
    name: 'Home',
    component: Home,
  },
];

export default routes;
