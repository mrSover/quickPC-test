import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controller/auth-controller';
import authMiddleware from '../middlewares/auth-middleware';
import roleMiddleware from '../middlewares/role-middleware';
import marketController from '../controller/market-controller';

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
router.get('/products', marketController.getProductsbyCategory);

export default router;