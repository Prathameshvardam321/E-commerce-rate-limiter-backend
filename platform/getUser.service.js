import { USERS_FROM_PLATFORM_SERVICES } from "../utils/Constant.js"


export const getUserById = (userId) => {
    return USERS_FROM_PLATFORM_SERVICES.find(user => user.user_id === userId);
}