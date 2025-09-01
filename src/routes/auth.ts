import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  getUsersByRole 
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);
router.get('/users/:role', authenticateToken, getUsersByRole);

export default router;
