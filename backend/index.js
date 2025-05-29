import express from 'express';
import cors from 'cors';
import userRouter from './router/userRoute.js'
import { connectDB } from "./server/models/userModel.js";
const app = express();
const PORT = 3000;


app.use(cors({
  origin: 'http://localhost:5173', // Allow Vite frontend
  credentials: true, // If you're using cookies
}));
// Middleware to parse JSON
app.use(express.json());

connectDB();

// Test route
// app.get('/', (req, res) => {
//   res.send('Hello from Node.js backend!');
// });

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "Server is running!" });
});

// Keep the server alive by pinging itself every 5 minutes
setInterval(() => {
  fetch("https://infinityblog.onrender.com/api/health").catch(() => {});
}, 300000); // 5 minutes (300,000 ms)

app.use('/user', userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
