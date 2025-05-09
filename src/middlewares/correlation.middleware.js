import { v4 as uuidV4 } from 'uuid';
import { asyncLocalStorage } from '../utils/helper/request.helpers.js';


export const attachCorrelationIdMiddleware = (req, res, next) => {
    // Generate a unique correlation ID
    const correlationId = uuidV4();

    req.headers['x-correlation-id'] = correlationId;

    // Call the next middleware or route handler
    asyncLocalStorage.run({ correlationId: correlationId }, () => {
        next();
    });
}
