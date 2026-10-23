import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import requirementRoutes from './routes/requirementRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/requirements', requirementRoutes);

app.use((err, req, res, next) => {
  console.error('[API Error]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.warn('[MongoDB] Starting server without DB connection. Will retry on request.');
  }

  app.listen(port, () => {
    console.log(`[Server] Running on http://localhost:${port}`);
  });
};

startServer();
