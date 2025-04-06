// /middleware/contextMiddleware.js
import { v4 as uuidv4 } from 'uuid';

export const contextMiddleware = (req, res, next) => {
    const incomingContextId = req.headers['x-context-id'];
    const contextId = incomingContextId || uuidv4();

    req.contextId = contextId;
    res.locals.contextId = contextId;

    // Optional: echo back for client tracing
    res.setHeader('x-context-id', contextId);

    next();
};
