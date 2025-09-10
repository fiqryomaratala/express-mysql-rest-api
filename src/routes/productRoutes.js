import express from 'express';
import { listProducts, addProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', listProducts);
router.post('/', addProduct);

export default router;