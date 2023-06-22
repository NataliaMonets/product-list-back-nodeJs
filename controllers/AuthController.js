import AuthService from '../services/AuthService.js';
import ValidationService from '../services/ValidationService.js';

class AuthController {
    async registration(req, res, next) {
        try {
            await ValidationService.fieldsValidation(req);
            const { email, password } = req.body;
            const user = await AuthService.registration(email, password);
            return  res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            await ValidationService.fieldsValidation(req);
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);
            res.cookie('accessToken', user.token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await AuthService.getUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { accessToken } = req.cookies;
            const token = await AuthService.logout(accessToken);
            res.clearCookie('accessToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();