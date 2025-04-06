

export const getProductsController = (req,res,next) =>{
    try {
        console.info('inside get products controller')
        // res.locals.response = response;
        next();
    } catch (error) {
        console.error('Error occurred in products.controller.js in methods getProductsController while fetching response')
        console.error(error)
        next(error);
    }
}