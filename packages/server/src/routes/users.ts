import express from 'express';
import { getAllUsers, getUserById, createUser } from '../services/userService';
import { ApiResponse, User } from '@sanderson/shared';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    const response: ApiResponse<User[]> = { success: true, data: users };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    if (!user) {
      const response: ApiResponse<null> = { success: false, error: 'User not found' };
      return res.status(404).json(response);
    }
    const response: ApiResponse<User> = { success: true, data: user };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await createUser(email, name);
    const response: ApiResponse<User> = { success: true, data: user };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

export default router;
