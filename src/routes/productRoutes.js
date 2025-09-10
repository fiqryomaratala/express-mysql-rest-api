import { Router } from 'express';
import { listProducts, getOneProduct, createOneProduct, updateOneProduct, deleteOneProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getOneProduct);
router.post('/', createOneProduct);
router.put('/:id', updateOneProduct);
router.delete('/:id', deleteOneProduct);



export default router;