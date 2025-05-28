import { connect, Schema, model } from "mongoose";
import 'dotenv/config';


export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
    
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// ✅ Blog subdocument schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true }); 

// ✅ User schema with embedded blogs
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  blogs: [blogSchema], // ⬅️ Embedding minimal blog details

}, { timestamps: true });

export default model("User", userSchema);