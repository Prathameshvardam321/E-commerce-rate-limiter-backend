import httpStatus from 'http-status';

//verifyAdminAccess
//permission based authentication
export const verifyAdminAccess = () =>{
    
}

export const auth = async (req, res, next) => {
    try {
        //
        const userId = req.headers['x-user-id'];
        // * This middleware ensures that only the API Gateway can access this backend.
        // *
        // * - The API Gateway handles JWT validation and extracts user info.
        // * - It injects 'x-user-id' in the header after verifying the token.
        // * - This backend trusts that header ONLY if it comes from the gateway.
        if (!userId) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "'x-user-id' header is missing",
            });
        }
         // ✨ Future enhancement: Fetch user from DB and include roles/permissions
        // const user = await db.getUserById(userId);
        // if (!user) {
        //     return res.status(httpStatus.UNAUTHORIZED).json({
        //         message: 'User not found or unauthorized',
        //     });
        // }
        // Attach user to request for later use
        res.locals = { userId };

        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error in authentication middleware",
        });
    }
};