import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const getAllBlogs = async (req, res) =>{
        try {
    // Get all users and their blog posts
    const users = await userModel.find({}, 'fullName blogs'); // Select only fullName and blogs

    // Flatten the blogs into a single list
    const allBlogs = users.flatMap(user => {
      return user.blogs.map(blog => ({
        blogId: blog._id,
        title: blog.title,
        content: blog.content,
        author: user.fullName,
        createdAt: blog.createdAt
      }));
    });

    // Optional: Sort by latest
    allBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(allBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
        console.log(req.body);
        
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


const getLoggedUserBlogs = async (req, res) => {
  try {
    const userId = req.user.userId; // set by your auth middleware

    // Find the user by ID and get only their blogs
    const user = await userModel.findById(userId, 'fullName blogs');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Format blogs with author's name
    const userBlogs = user.blogs.map(blog => ({
      blogId: blog._id,
      title: blog.title,
      content: blog.content,
      author: user.fullName,
      createdAt: blog.createdAt,
      published: blog.published
    }));

    // Optional: Sort by createdAt descending
    userBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(userBlogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

const getSingleUserBlog = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware
    const blogId = req.params.id;

    // Find the user and the blog
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blog = user.blogs.id(blogId); // Mongoose subdocument query

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      blogId: blog._id,
      title: blog.title,
      content: blog.content,
      published: blog.published,
      createdAt: blog.createdAt,
    });
  } catch (error) {
    console.error('Error fetching single blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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


const deleteBlog = async (req, res) => {
  try {
    const userId = req.user.userId; // Set by your verifyUser middleware
    const blogId = req.params.blogId;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const blog = user.blogs.id(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Remove the blog
    user.blogs.pull({ _id: blogId });

    await user.save();

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {signup, login, getAllBlogs, getLoggedUserBlogs, getSingleUserBlog,  createBlog, editBlog, deleteBlog}