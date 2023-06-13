import express from 'express';
import authRoute from './AuthRoute';
import bookingRoute from './BookingRoute';
import parkSpotRoute from './ParkSpotRoute';

const router = express.Router();

const allRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/parking-spot',
    route: parkSpotRoute,
  },
  {
    path: '/booking',
    route: bookingRoute,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
