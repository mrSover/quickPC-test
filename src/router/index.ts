import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controller/auth-controller';
import authMiddleware from '../middlewares/auth-middleware';
import roleMiddleware from '../middlewares/role-middleware';
import marketController from '../controller/market-controller';
import { uploadSingleFile } from '../middlewares/file-middleware'

const router = Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, roleMiddleware(["ADMIN"]), userController.getUsers);
router.get('/hotproducts', marketController.getHotProducts);
router.get('/category', marketController.getProductsbyCategory);
router.get('/computer', marketController.getComputersByFilters);
router.get('/component', marketController.getComponentsByFilters);
router.get('/product/:id', marketController.getProduct);
router.post('/component', uploadSingleFile, marketController.createComponent);
router.post('/computer', uploadSingleFile, marketController.createComponent);



export default router;