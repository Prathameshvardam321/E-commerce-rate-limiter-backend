import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import { getUserById } from "../platform/getUser.service.js";
import ApiError from "../utils/ApiError.js";


export const generateTokenService = async(body) =>{
    try {
  
    const { userId } = body;
    if (!userId) {
        throw new ApiError('EC-001','User Id is required',httpStatus.BAD_REQUEST)
    }
    const user = getUserById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "banned") {
        return res.status(403).json({ message: "User is banned" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.TOKEN.JWT.JWT_SECRET, { expiresIn: "1h" });
    return token      
} catch (error) {
        console.error(error)
        throw new ApiError('EC-01','Internal Service Occur , please contact support',httpStatus.INTERNAL_SERVER_ERROR)
}
}