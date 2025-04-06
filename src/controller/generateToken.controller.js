import { generateTokenService } from "../service/generateToken.service.js"


export const generateTokenController = async(req,res,next) => {
try {
    const response = await generateTokenService()
    res.locals.response = response;
    next();
} catch (error) {
    console.error('Error occurred in generateToken.controller.js in methods generateTokenController while fetching response')
    console.error(error)
    next(error);
}
}