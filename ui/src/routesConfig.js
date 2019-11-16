import React from 'react';
import Loadable from 'react-loadable';

import {
  HOME,
  COMPANIES,
  LEAVEFEEDBACK,
  REVIEWCOMPANIES
} from '@career/constants/routes';
import LoadingProgress from '@career/components/common/LoadingProgress';

const Loading = () => <LoadingProgress />;

const Home = Loadable({
  loader: () => import('@career/components/pages/Home'),
  loading: Loading,
});

const Companies = Loadable({
  loader: () => import('@career/components/pages/Companies'),
  loading: Loading,
});

const LeaveFeedback = Loadable({
  loader: () => import('@career/components/pages/LeaveFeedback'),
  loading: Loading,
});

const ReviewCompanies = Loadable({
  loader: () => import('@career/components/pages/ReviewCompanies'),
  loading: Loading,
});

const routes = [
  {
    path: HOME,
    name: 'Home',
    component: Home,
  },
  {
    path: COMPANIES,
    name: 'Companies',
    component: Companies,
  },
  {
    path: LEAVEFEEDBACK,
    name: 'LeaveFeedback',
    component: LeaveFeedback,
  },
  {
    path: REVIEWCOMPANIES,
    name: 'ReviewCompanies',
    component: ReviewCompanies,
  },
];

export default routes;
