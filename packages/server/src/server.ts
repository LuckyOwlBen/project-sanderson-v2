import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TalentsRoute } from './routes/talentsRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
const talentsRoute = new TalentsRoute();
app.use('/api/talents', talentsRoute.getRouter());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
