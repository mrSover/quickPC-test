import { Router } from 'express';
import { body } from 'express-validator';
import marketController from '../controller/market-controller';


const router = Router();


router.get('/products', marketController.getProductsbyCategory);



export default router;