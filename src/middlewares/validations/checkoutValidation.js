// middleware/validateCheckout.js
import Joi from 'joi';

const checkoutSchema = Joi.object({
    cart: Joi.array().items(
        Joi.object({
            id: Joi.number().required(),
            name: Joi.string().required(),
            price: Joi.number().positive().required(),
            quantity: Joi.number().integer().min(1).default(1)
        })
    ).min(1).required(),
    userId: Joi.string().required()
});

export const validateCheckout = (req, res, next) => {
    const { error } = checkoutSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed.',
            details: error.details.map(err => err.message)
        });
    }

    next();
};
