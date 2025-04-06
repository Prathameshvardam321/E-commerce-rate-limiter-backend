import { checkoutService } from "../service/checkOutService.js";

export const checkoutController = (req,res,next) =>{
    try {
        console.info('inside checkout controller')
        const {body} = req
        const {locals} = res
        const response =  checkoutService(body,locals) 
        res.locals.response = response;
        next();
    } catch (error) {
        console.error('Error occurred in checkout.controller.js in methods checkoutController while fetching response')
        console.error(error)
        next(error);
    }
}