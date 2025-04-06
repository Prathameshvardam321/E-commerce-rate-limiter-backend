


export const checkoutController = (req,res,next) =>{
    try {
        console.info('inside checkout controller')
        // res.locals.response = response;
        next();
    } catch (error) {
        console.error('Error occurred in checkout.controller.js in methods checkoutController while fetching response')
        console.error(error)
        next(error);
    }
}