import httpStatus from 'http-status'

export const responseHandler = (req, res, next) => {
    const response = res?.locals?.response || {};
    //we can emit locals events
    // emitLocalEvents(res.locals?.events)
    res.status(httpStatus.OK).send(response);
}
