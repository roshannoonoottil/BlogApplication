import express from 'express';
import cors from 'cors';
import userRouter from './router/userRoute.js'
import { connectDB } from "./server/models/userModel.js";
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://infinityblog.vercel.app", // ✅ Deployed frontend
        "http://localhost:3000", // ✅ Local development frontend
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ Required for cookies/auth headers
    exposedHeaders: ["set-cookie"] // Important for iOS
  })
);


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
