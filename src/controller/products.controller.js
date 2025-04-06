import {getProductsService} from '../service/getProducts.service.js'
export const getProductsController = async(req,res,next) =>{
    try {
        console.info('inside get products controller')
        const {query} = req
        const response = await getProductsService(query)
        res.locals.response = response;
        next();
    } catch (error) {
        console.error('Error occurred in products.controller.js in methods getProductsController while fetching response')
        console.error(error)
        next(error);
    }
}