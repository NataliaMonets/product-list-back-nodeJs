import Token from '../models/Token.js';
import jwt from 'jsonwebtoken';
import secretKey from '../config.js';

class TokenService {
    generateAccessToken(id, email) {
        const payload = {
            id,
            email
        };
        return jwt.sign(payload, secretKey.secret, { expiresIn: "24h" });
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
}

export default new TokenService();