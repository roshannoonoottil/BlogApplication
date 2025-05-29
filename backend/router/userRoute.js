import express from 'express';
const router = express.Router();
import userController from '../server/controllers/userController.js';
import verifyUser from '../server/middleware/verifyUser.js';

router.get('/home', userController.getAllBlogs);
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/singleblog/:id', verifyUser, userController.getSingleUserBlog);
router.post('/create', verifyUser, userController.createBlog)
router.put('/edit/:blogId', verifyUser, userController.editBlog);
router.delete('/delete/:blogId', verifyUser, userController.deleteBlog);
router.get('/blogs', verifyUser, userController.getLoggedUserBlogs);
router.get('/publicblog/:id',userController.getSingleBlogPublic);


export default router; 