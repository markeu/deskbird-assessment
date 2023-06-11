import express from 'express';
import authRoute from './AuthRoute';
import parkSpotRoute from './ParkSpotRoute';

const router = express.Router();

const allRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/',
    route: parkSpotRoute,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
