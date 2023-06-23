import Token from '../models/Token.js';
import jwt from 'jsonwebtoken';
import secretKey from '../config.js';

class TokenService {
    generateAccessToken(id, email) {
        const payload = {
            id,
            email
        };
        return jwt.sign(payload, secretKey.secret, { expiresIn: "12h" });
    }

    async saveToken(id, token) {
        const existingToken = await Token.findOne({ user: id });
        if (existingToken) {
            existingToken.token = token;
            return existingToken.save();
        }
        const savedToken = await Token.create({user: id, token});
        return savedToken;
    }

    async removeToken(token) {
        const tokenData = await Token.deleteOne({token});
        return tokenData;
    }

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, secretKey.secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(token) {
        const tokenData = await Token.findOne({token});
        return tokenData;
    }
}

export default new TokenService();