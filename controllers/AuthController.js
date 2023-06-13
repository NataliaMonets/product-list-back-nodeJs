import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import secretKey from './config.js';

const generateAccessToken = (id, email) => {
    const payload = {
        id,
        email
    }
    return jwt.sign(payload, secretKey.secret, { expiresIn: "24h" })
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Fields validation failed', errors});
            }
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({message: 'User already exists'});
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const user = new User({email, password: hashPassword});
            await user.save();
            return  res.json({ message: 'The user is successfully registered' });
        } catch (e) {
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Fields validation failed', errors});
            }
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({message: 'User does not exists'});
            }
            const validPassword = bcrypt.compareSync(password, existingUser.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Invalid password'});
            }
            const token = generateAccessToken(existingUser._id, existingUser.email);
            existingUser.token = token;
            return res.json(existingUser)
        } catch (e) {
            res.status(400).json({ message: 'Login error' });
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
            
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export default new AuthController();