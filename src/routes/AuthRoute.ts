import express from 'express';
import { Container } from 'typedi';

// import { SignInRequest } from '../requests/SignInRequest';
import { SignUpRequest } from '../requests/SignUpRequest';
import AuthController from '../controllers/AuthController';
import RequestValidator from '../middlewares/RequestValidator';

const router = express.Router();

/**
 * We are using TypeDI to get the UserService instance from our dependency container
 */
const authController = Container.get(AuthController);

router.post('/sign-up', RequestValidator.validate(SignUpRequest), authController.signUp);
// router.post('/sign-in', RequestValidator.validate(SignInRequest), authController.signIn);
router.get('/users', authController.getAllUsers);

export default router;
