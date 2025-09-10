import Joi from "joi";

export const createOneProductSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().allow("").max(255),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(255),
    price: Joi.number().positive(),
    description: Joi.string().allow("").max(255),
}).min(1); //At least one field is required