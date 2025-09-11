import ApiError from "../utils/apiError.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { convert: false });
        if (error) {
            return next(new ApiError(400, error.message));
        }
        req.validateBody = value; // Simpan data yang sudah divalidasi
        next();
    };
};