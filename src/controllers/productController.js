import { asyncHandler } from "../middlewares/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../services/productService.js"; 
import { createOneProductSchema, updateProductSchema } from "../validations/product.schema.js";    

export const listProducts = asyncHandler(async (req, res) => {
    const products = await getProducts();
    res.json(products);
});


export const getOneProduct = asyncHandler(async (req, res) => {
    const product = await getProductById(req.params.id);
    if (!product) throw new ApiError(404, "Product not found");
    res.json(product);
});

export const createOneProduct = asyncHandler(async (req, res,) => {
    const { error, value } = createOneProductSchema.validate(req.body, { convert: false });
    if (error) throw new ApiError(400, error.message);

    const product = await createProduct(value);
    res.status(201).json(product); 
})

export const updateOneProduct = asyncHandler(async (req, res) => {
    const { error, value } = updateProductSchema.validate(req.body, { convert: false });
    if (error) throw new ApiError(400, error.message);

    const product = await updateProduct(req.params.id, value);
    if (!product) throw new ApiError(404, "Product not found");
    res.json(product);
});

export const deleteOneProduct = asyncHandler(async (req, res) => {
    const ok = await deleteProduct(req.params.id);
    if (!ok) throw new ApiError(404, "Product not found");
    return res.status(204).end();
});


