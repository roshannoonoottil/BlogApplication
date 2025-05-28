import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import 'dotenv/config';
import jwt from 'jsonwebtoken';


const homepage = async (req, res) =>{
        res.json({ data: "This is the Home Page" });
}

const signup =  async (req, res) => {

    try {
        console.log('signup Controller');
        console.log(req.body);
        
        const { fullName, email, password } = req.body;
        let user = await userModel.findOne({ email });
        console.log("User Exist : ", user);
        if (user) return res.status(400).send("This email is already used.");
    
        const hashPass = await bcrypt.hash(password, 10);
        console.log('hashed password', hashPass);
    
        const userData = new userModel({
            fullName,
            email,
            password: hashPass,

        });
        console.log('User Details :',userData);
        
        await userData.save();
        console.log("Saved data", userData);
        res.json({ data: "User data saved in database" });
    } catch (err) {
        console.log("Error at user Register", err);
    }
}


const login = async (req, res) => {
    try {
        console.log('Login Controller');

        // Find user by email
        const userData = await userModel.findOne({ email: req.body.email });
        if (!userData) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!isValidPassword) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // Prepare user details (ensure it matches signup structure)
        const userDetails = {
            userId: userData._id,
            fullName: userData.fullName,  
            email: userData.email,
            createdAt: userData.createdAt,
        };

        // Generate JWT token
        const token = jwt.sign(userDetails, process.env.USER_JWT_SECRET, { expiresIn: '1h' });

        // Send response
        res.json({ success: true, token: token, data: userDetails });
        console.log('User signed in:', userDetails);

    } catch (error) {
        console.log("Login error", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const createBlog = async (req, res) => {
  try {
    const userId = req.user.userId; // You should set this from auth middleware
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    // Find user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create blog post
    const newBlog = {
      title,
      content,
      createdAt: new Date(),
      published: true
    };

    // Add blog to user's blogs array
    user.blogs.push(newBlog);

    await user.save();

    // Return the created blog
    const createdBlog = user.blogs[user.blogs.length - 1];

    res.status(201).json({
      message: 'Blog created successfully.',
      blog: createdBlog
    });

  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


const editBlog = async (req, res) => {
  try {
    const userId = req.user.userId; // comes from auth middleware
    const blogId = req.params.blogId;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const blog = user.blogs.id(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Update fields
    blog.title = title;
    blog.content = content;
    blog.updatedAt = new Date();

    await user.save();

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Error editing blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export default {signup, login, homepage, createBlog, editBlog}