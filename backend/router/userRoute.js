import express from 'express';
const router = express.Router();
import userController from '../server/controllers/userController.js';
import verifyUser from '../server/middleware/verifyUser.js';

router.get('/', userController.getAllBlogs);
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/create', verifyUser, userController.createBlog)
router.put('/edit/:blogId', verifyUser, userController.editBlog);
router.delete('/delete/:blogId', verifyUser, userController.deleteBlog);

export default router; 