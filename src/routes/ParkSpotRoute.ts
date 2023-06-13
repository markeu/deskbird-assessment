import express from 'express';
import { Container } from 'typedi';

import ParkSpotController from '../controllers/ParkSpotController';

const router = express.Router();

/**
 * We are using TypeDI to get the ParkSpot instance from our dependency container
 */
const parkSpotController = Container.get(ParkSpotController);

router.get('/get-one', parkSpotController.getParkingSpot);
router.get('/', parkSpotController.getAllParkingSpots);
router.post('/', parkSpotController.seedParkingSpot);

export default router;
