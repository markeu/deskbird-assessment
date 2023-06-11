import express from 'express';
import { Container } from 'typedi';

import { SignUpRequest } from '../requests/SignUpRequest';
import AuthController from '../controllers/AuthController';
import RequestValidator from '../middlewares/RequestValidator';

const router = express.Router();

/**
 * We are using TypeDI to get the UserService instance from our dependency container
 */
const authController = Container.get(AuthController);

router.post('/sign-up', RequestValidator.validate(SignUpRequest), authController.signUp);
router.get('/users', authController.getAllUsers);
router.post('/users', authController.seedUsers);

export default router;
