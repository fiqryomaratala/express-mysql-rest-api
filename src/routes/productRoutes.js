import { Router } from 'express';
import { listProducts, getOneProduct, createOneProduct, updateOneProduct, deleteOneProduct } from '../controllers/productController.js';
import { validate } from '../middlewares/validate.js';
import { createOneProductSchema, updateProductSchema } from '../validations/product.schema.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getOneProduct);
router.post('/', validate(createOneProductSchema), createOneProduct);
router.put('/:id', validate(updateProductSchema), updateOneProduct);
router.delete('/:id', deleteOneProduct);



export default router;