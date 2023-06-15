import User from '../models/User.js';
import { validationResult } from 'express-validator';
import AuthService from '../services/AuthService.js';

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Fields validation failed', errors});
            }
            const { email, password } = req.body;
            const user = await AuthService.registration(email, password);
            return  res.json(user);
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Fields validation failed', errors});
            }
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);
            res.cookie('accessToken', user.token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(user)
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async logout(req, res) {
        try {
            const { accessToken } = req.cookies;
            const token = await AuthService.logout(accessToken);
            res.clearCookie('accessToken');
            return res.json(token);
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export default new AuthController();