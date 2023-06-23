import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';

class ValidationService {
    async fieldsValidation(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Fields validation failed', errors.array());
        }
        return;
    }
}

export default new ValidationService();