import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100).required(),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(100),
    email: Joi.string().email().max(100),
    password: Joi.string().min(6).max(100),
}).min(1); // At least one field is required