import Router from 'express';
import AuthController from '../controllers/AuthController.js';
import { check } from 'express-validator';

const authRouter = new Router();

authRouter.post('/registration', [
    check('email', "Invalid email").isEmail(),
    check('password', "Email should be between 6 and 10 symbols").isLength({ min: 6, max: 10 })
], AuthController.registration)
authRouter.post('/login', [
    check('email', "Invalid email").isEmail(),
    check('password', "Email should be between 6 and 10 symbols").isLength({ min: 6, max: 10 })
], AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/users', AuthController.getUsers)

export default authRouter;