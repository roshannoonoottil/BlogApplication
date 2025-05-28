import express from 'express';
const router = express.Router();
import userController from '../server/controllers/userController.js';
import verifyUser from '../server/middleware/verifyUser.js';

router.get('/', userController.homepage);
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/create', verifyUser, userController.createBlog)

export default router; 