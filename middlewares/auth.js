import httpStatus from 'http-status';

//verifyAdminAccess
//permission based authentication
export const verifyAdminAccess = () =>{
    
}

export const auth = async (req, res, next) => {
    try {
        const userId = req.headers['x-user-id'];

        if (!userId) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "'x-user-id' header is missing",
            });
        }

        // Attach user to request for later use
        req.user = { id: userId };

        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error in authentication middleware",
        });
    }
};