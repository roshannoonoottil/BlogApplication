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

app.use('/user', userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
