import { Router } from 'express';
import productController from './product.controller.js';

const productRouter = Router();

productRouter.get('/product', productController.searchProducts);

export default productRouter;
