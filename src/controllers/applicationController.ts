import { Request, Response } from 'express';
import { Profile } from '../models/Profile';
import { Family } from '../models/Family';
import { Education } from '../models/Education';
import { Extracurricular } from '../models/Extracurricular';
import { 
  profileSchema, 
  familySchema, 
  educationSchema, 
  extracurricularSchema,
  ProfileRequest,
  FamilyRequest,
  EducationRequest,
  ExtracurricularRequest
} from '../validations/application';

// Profile Controllers
export const createOrUpdateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('CreateOrUpdateProfile: Received profile request', { userId, body: req.body });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    // Validate request body
    const { error, value } = profileSchema.validate(req.body);
    if (error) {
      console.warn('CreateOrUpdateProfile: Validation error', error.details.map(detail => detail.message));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }

    const profileData: ProfileRequest = value;

    // Convert dob string to Date
    const profileDataWithDate = {
      ...profileData,
      dob: new Date(profileData.dob)
    };

    // Upsert profile data
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { ...profileDataWithDate, userId },
      { upsert: true, new: true, runValidators: true }
    );

    console.log('CreateOrUpdateProfile: Profile saved', { userId, profileId: profile._id });

    res.status(200).json({
      success: true,
      message: 'Profile saved successfully',
      data: { profile }
    });

  } catch (error) {
    console.error('CreateOrUpdateProfile: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('GetProfile: Fetching profile', { userId });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
      return;
    }

    console.log('GetProfile: Profile found', { userId, profileId: profile._id });

    res.status(200).json({
      success: true,
      data: { profile }
    });

  } catch (error) {
    console.error('GetProfile: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Family Controllers
export const createOrUpdateFamily = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('CreateOrUpdateFamily: Received family request', { userId, body: req.body });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    // Validate request body
    const { error, value } = familySchema.validate(req.body);
    if (error) {
      console.warn('CreateOrUpdateFamily: Validation error', error.details.map(detail => detail.message));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }

    const familyData: FamilyRequest = value;

    // Upsert family data
    const family = await Family.findOneAndUpdate(
      { userId },
      { ...familyData, userId },
      { upsert: true, new: true, runValidators: true }
    );

    console.log('CreateOrUpdateFamily: Family saved', { userId, familyId: family._id });

    res.status(200).json({
      success: true,
      message: 'Family information saved successfully',
      data: { family }
    });

  } catch (error) {
    console.error('CreateOrUpdateFamily: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getFamily = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('GetFamily: Fetching family', { userId });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const family = await Family.findOne({ userId });
    if (!family) {
      res.status(404).json({
        success: false,
        message: 'Family information not found'
      });
      return;
    }

    console.log('GetFamily: Family found', { userId, familyId: family._id });

    res.status(200).json({
      success: true,
      data: { family }
    });

  } catch (error) {
    console.error('GetFamily: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Education Controllers
export const createOrUpdateEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('CreateOrUpdateEducation: Received education request', { userId, body: req.body });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    // Validate request body
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      console.warn('CreateOrUpdateEducation: Validation error', error.details.map(detail => detail.message));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }

    const educationData: EducationRequest = value;

    // Upsert education data
    const education = await Education.findOneAndUpdate(
      { userId },
      { ...educationData, userId },
      { upsert: true, new: true, runValidators: true }
    );

    console.log('CreateOrUpdateEducation: Education saved', { userId, educationId: education._id });

    res.status(200).json({
      success: true,
      message: 'Education information saved successfully',
      data: { education }
    });

  } catch (error) {
    console.error('CreateOrUpdateEducation: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('GetEducation: Fetching education', { userId });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const education = await Education.findOne({ userId });
    if (!education) {
      res.status(404).json({
        success: false,
        message: 'Education information not found'
      });
      return;
    }

    console.log('GetEducation: Education found', { userId, educationId: education._id });

    res.status(200).json({
      success: true,
      data: { education }
    });

  } catch (error) {
    console.error('GetEducation: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Extracurricular Controllers
export const createOrUpdateExtracurricular = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('CreateOrUpdateExtracurricular: Received extracurricular request', { userId, body: req.body });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    // Validate request body
    const { error, value } = extracurricularSchema.validate(req.body);
    if (error) {
      console.warn('CreateOrUpdateExtracurricular: Validation error', error.details.map(detail => detail.message));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }

    const extracurricularData: ExtracurricularRequest = value;

    // Upsert extracurricular data
    const extracurricular = await Extracurricular.findOneAndUpdate(
      { userId },
      { ...extracurricularData, userId },
      { upsert: true, new: true, runValidators: true }
    );

    console.log('CreateOrUpdateExtracurricular: Extracurricular saved', { userId, extracurricularId: extracurricular._id });

    res.status(200).json({
      success: true,
      message: 'Extracurricular information saved successfully',
      data: { extracurricular }
    });

  } catch (error) {
    console.error('CreateOrUpdateExtracurricular: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getExtracurricular = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('GetExtracurricular: Fetching extracurricular', { userId });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const extracurricular = await Extracurricular.findOne({ userId });
    if (!extracurricular) {
      res.status(404).json({
        success: false,
        message: 'Extracurricular information not found'
      });
      return;
    }

    console.log('GetExtracurricular: Extracurricular found', { userId, extracurricularId: extracurricular._id });

    res.status(200).json({
      success: true,
      data: { extracurricular }
    });

  } catch (error) {
    console.error('GetExtracurricular: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all application data for a user
export const getAllApplicationData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('GetAllApplicationData: Fetching all application data', { userId });

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const [profile, family, education, extracurricular] = await Promise.all([
      Profile.findOne({ userId }),
      Family.findOne({ userId }),
      Education.findOne({ userId }),
      Extracurricular.findOne({ userId })
    ]);

    console.log('GetAllApplicationData: Application data fetched', { 
      userId, 
      hasProfile: !!profile,
      hasFamily: !!family,
      hasEducation: !!education,
      hasExtracurricular: !!extracurricular
    });

    res.status(200).json({
      success: true,
      data: {
        profile,
        family,
        education,
        extracurricular
      }
    });

  } catch (error) {
    console.error('GetAllApplicationData: Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
