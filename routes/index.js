import express from 'express';
const router = express.Router();
import {registerController,loginController,userController,refreshController,productController} from '../Controllers';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',auth,userController.me);
router.post('/refresh',refreshController.refresh);
router.post('/logout',auth, loginController.logout);

router.post('/products',[auth,admin],productController.store);

router.put('/products',[auth,admin],productController.update);



export default router; 