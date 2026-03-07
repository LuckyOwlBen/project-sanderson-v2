import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { TalentsRoute } from './routes/talentsRoute.js';
import { IdentityRoutes } from './routes/identityRoutes.js';

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

const identityRoute = new IdentityRoutes();
app.use('/api/identity', identityRoute.getRouter());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
