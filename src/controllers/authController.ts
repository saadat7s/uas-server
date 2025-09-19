import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/User';
import { registerUserSchema, loginSchema, RegisterUserRequest, LoginRequest } from '../validations/auth';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('RegisterUser: Received registration request', { body: req.body });

    // Validate request body
    const { error, value } = registerUserSchema.validate(req.body);
    if (error) {
      console.warn('RegisterUser: Validation error', error.details.map(detail => detail.message));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }

    const userData: RegisterUserRequest = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
      console.warn('RegisterUser: User with this email already exists', { email: userData.email });
      res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Create new user
    const newUser = new User({
      ...userData,
      email: userData.email.toLowerCase(),
      dob: new Date(userData.dob)
    });

    await newUser.save();
    console.log('RegisterUser: New user registered', { userId: newUser._id, email: newUser.email });

    // Do NOT generate or return a JWT token on registration.
    // The user should log in after registration to receive a token.

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
          isEmailVerified: newUser.isEmailVerified,
          isPhoneVerified: newUser.isPhoneVerified,
          createdAt: newUser.createdAt
        }
      }
    });

  } catch (error) {
    console.error('RegisterUser: Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
};

// The token should only be generated after verifying the user's credentials (email and password).
// This allows the client to receive a token only after successful authentication.

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('LoginUser: Received login request', { body: req.body });

    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      console.warn('LoginUser: Validation error', error.details.map(detail => detail.message));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }

    const { email, password }: LoginRequest = value;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.warn('LoginUser: User not found for email', { email });
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.warn('LoginUser: Invalid password for user', { email });
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Generate JWT token after successful authentication
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    console.log('LoginUser: User logged in successfully', { userId: user._id, email: user.email });

    // Return success response with token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          createdAt: user.createdAt
        },
        token
      }
    });

  } catch (error) {
    console.error('LoginUser: Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // This will be implemented with middleware to extract user from JWT
    const userId = (req as any).user?.userId;
    console.log('GetCurrentUser: Fetching current user', { userId });
    
    if (!userId) {
      console.warn('GetCurrentUser: Unauthorized access attempt');
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.warn('GetCurrentUser: User not found', { userId });
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    console.log('GetCurrentUser: User found', { userId: user._id });

    res.status(200).json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('GetCurrentUser: Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getUsersByRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.params;
    console.log('GetUsersByRole: Fetching users by role', { role });
    
    if (!Object.values(UserRole).includes(role as UserRole)) {
      console.warn('GetUsersByRole: Invalid role specified', { role });
      res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
      return;
    }

    const users = await User.find({ role }).select('-password').sort({ createdAt: -1 });

    console.log('GetUsersByRole: Users fetched', { role, count: users.length });

    res.status(200).json({
      success: true,
      data: { users }
    });

  } catch (error) {
    console.error('GetUsersByRole: Get users by role error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    console.log('LogoutUser: User logging out', { userId });


    if (userId) {
      console.log('LogoutUser: User logged out successfully', { userId });
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('LogoutUser: Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout'
    });
  }
};