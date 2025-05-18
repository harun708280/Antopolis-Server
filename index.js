import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import categoryRoutes  from './routes/categoryRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use('/api', categoryRoutes);

// DB & Server
const PORT = process.env.PORT || 5000;
connectDB();
app.get("/", (req, res) => {
    res.send("MongoDB Connected Successfully 🚀");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
