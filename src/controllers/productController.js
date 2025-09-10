import { getAllProducts, createProduct } from "../services/productService.js";    

export async function listProducts(req, res) {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({message: err.message});
    }
}

export async function addProduct(req, res) {
    try {
        const {name, price} = req.body;
        if (!name || !price) {
            return res.status(400).json({error: "Name and price are required"});
        }
        const product = await createProduct({name, price});
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: err.message});
    }
}

