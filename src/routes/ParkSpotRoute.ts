import express from 'express';
import { Container } from 'typedi';

import ParkSpotController from '../controllers/ParkSpotController';

const router = express.Router();

/**
 * We are using TypeDI to get the ParkSpot instance from our dependency container
 */
const parkSpotController = Container.get(ParkSpotController);

router.get('/park-spot', parkSpotController.getParkingSpot);
router.get('/park-spots', parkSpotController.getAllParkingSpots);
router.post('/park-spots', parkSpotController.seedParkingSpot);

export default router;
