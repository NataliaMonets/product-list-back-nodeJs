import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import TokenService from './TokenService.js';
import ApiError from '../exceptions/api-error.js';

class AuthService {
    async registration(email, password) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw ApiError.BadRequest('User already exists');
        }
        const hashPassword = bcrypt.hashSync(password, 5);
        const user = new User({ email, password: hashPassword });
        await user.save();
        return user;
    }

    async login(email, password) {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw ApiError.BadRequest('User does not exists');
        }
        const validPassword = bcrypt.compareSync(password, existingUser.password);
        if (!validPassword) {
            throw ApiError.BadRequest('Invalid password');
        }
        const token = TokenService.generateAccessToken(existingUser._id, existingUser.email);
        await TokenService.saveToken(existingUser._id, token);
        existingUser.token = token;
        return existingUser;
    }

    async getUsers() {
        const users = await User.find();
        return users;
    }

    async logout(token) {
        const exsistingToken = await TokenService.removeToken(token);
        return exsistingToken;
    }
}

export default new AuthService();