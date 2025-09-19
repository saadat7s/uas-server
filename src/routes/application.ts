import { Router } from 'express';
import { 
  createOrUpdateProfile,
  getProfile,
  createOrUpdateFamily,
  getFamily,
  createOrUpdateEducation,
  getEducation,
  createOrUpdateExtracurricular,
  getExtracurricular,
  getAllApplicationData
} from '../controllers/applicationController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Profile routes
router.post('/create-or-update-profile', createOrUpdateProfile);
router.get('/get-profile', getProfile);

// Family routes
router.post('/create-or-update-family', createOrUpdateFamily);
router.get('/get-family', getFamily);

// Education routes
router.post('/create-or-update-education', createOrUpdateEducation);
router.get('/get-education', getEducation);

// Extracurricular routes
router.post('/create-or-update-extracurricular', createOrUpdateExtracurricular);
router.get('/get-extracurricular', getExtracurricular);

// Get all application data
router.get('/all', getAllApplicationData);

export default router;
