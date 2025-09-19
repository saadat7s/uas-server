import Joi from 'joi';

// Profile validation schema
export const profileSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.min': 'First name must be at least 1 character long',
      'string.max': 'First name cannot exceed 50 characters',
      'any.required': 'First name is required'
    }),
  
  middleName: Joi.string()
    .max(50)
    .allow('')
    .messages({
      'string.max': 'Middle name cannot exceed 50 characters'
    }),
  
  lastName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.min': 'Last name must be at least 1 character long',
      'string.max': 'Last name cannot exceed 50 characters',
      'any.required': 'Last name is required'
    }),
  
  address: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.min': 'Address must be at least 10 characters long',
      'string.max': 'Address cannot exceed 500 characters',
      'any.required': 'Address is required'
    }),
  
  primaryLang: Joi.string()
    .valid('en', 'ur')
    .required()
    .messages({
      'any.only': 'Primary language must be either English or Urdu',
      'any.required': 'Primary language is required'
    }),
  
  citizen: Joi.string()
    .valid('PK', 'Non-PK')
    .required()
    .messages({
      'any.only': 'Citizen status must be either PK or Non-PK',
      'any.required': 'Citizen status is required'
    }),
  
  cnic: Joi.string()
    .pattern(/^\d{5}-\d{7}-\d{1}$/)
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid CNIC format (XXXXX-XXXXXXX-X)',
      'any.required': 'CNIC is required'
    }),
  
  gender: Joi.string()
    .valid('Male', 'Female')
    .required()
    .messages({
      'any.only': 'Gender must be either Male or Female',
      'any.required': 'Gender is required'
    }),
  
  dob: Joi.date()
    .max('now')
    .required()
    .custom((value, helpers) => {
      const today = new Date();
      const age = today.getFullYear() - value.getFullYear();
      const monthDiff = today.getMonth() - value.getMonth();
      
      let actualAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
        actualAge = age - 1;
      }
      
      if (actualAge < 16) {
        return helpers.error('any.invalid', { message: 'User must be at least 16 years old' });
      }
      
      return value;
    })
    .messages({
      'date.max': 'Date of birth cannot be in the future',
      'any.required': 'Date of birth is required',
      'any.invalid': 'User must be at least 16 years old'
    }),
  
  maritalStatus: Joi.string()
    .valid('Married', 'Unmarried')
    .required()
    .messages({
      'any.only': 'Marital status must be either Married or Unmarried',
      'any.required': 'Marital status is required'
    }),
  
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number',
      'any.required': 'Phone number is required'
    }),
  
  photoName: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Photo name must be a string'
    }),
  
  photoBytes: Joi.number()
    .min(0)
    .max(5 * 1024 * 1024)
    .messages({
      'number.min': 'Photo size cannot be negative',
      'number.max': 'Photo size cannot exceed 5MB'
    })
});

// Family validation schema
export const familySchema = Joi.object({
  fatherName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Father\'s name must be at least 2 characters long',
      'string.max': 'Father\'s name cannot exceed 100 characters',
      'any.required': 'Father\'s name is required'
    }),
  
  motherName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Mother\'s name must be at least 2 characters long',
      'string.max': 'Mother\'s name cannot exceed 100 characters',
      'any.required': 'Mother\'s name is required'
    }),
  
  fatherOccupation: Joi.string()
    .valid('govt', 'non-govt')
    .required()
    .messages({
      'any.only': 'Father\'s occupation must be either govt or non-govt',
      'any.required': 'Father\'s occupation is required'
    })
});

// Education validation schema
export const educationSchema = Joi.object({
  matricGrades: Joi.string()
    .min(1)
    .max(200)
    .required()
    .messages({
      'string.min': 'Matric grades must be provided',
      'string.max': 'Matric grades cannot exceed 200 characters',
      'any.required': 'Matric grades are required'
    }),
  
  matricPicName: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Matric picture name must be a string'
    }),
  
  fscGrades: Joi.string()
    .min(1)
    .max(200)
    .required()
    .messages({
      'string.min': 'FSC grades must be provided',
      'string.max': 'FSC grades cannot exceed 200 characters',
      'any.required': 'FSC grades are required'
    }),
  
  fscPicName: Joi.string()
    .allow('')
    .messages({
      'string.base': 'FSC picture name must be a string'
    }),
  
  collegeName: Joi.string()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.min': 'College name must be at least 2 characters long',
      'string.max': 'College name cannot exceed 200 characters',
      'any.required': 'College name is required'
    })
});

// Extracurricular validation schema
export const extracurricularSchema = Joi.object({
  clubs: Joi.string()
    .min(1)
    .max(500)
    .required()
    .messages({
      'string.min': 'Clubs information must be provided',
      'string.max': 'Clubs information cannot exceed 500 characters',
      'any.required': 'Clubs information is required'
    }),
  
  certDocName: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Certificate document name must be a string'
    })
});

// Type definitions for request bodies
export interface ProfileRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  primaryLang: 'en' | 'ur';
  citizen: 'PK' | 'Non-PK';
  cnic: string;
  gender: 'Male' | 'Female';
  dob: string;
  maritalStatus: 'Married' | 'Unmarried';
  phone: string;
  photoName?: string;
  photoBytes?: number;
}

export interface FamilyRequest {
  fatherName: string;
  motherName: string;
  fatherOccupation: 'govt' | 'non-govt';
}

export interface EducationRequest {
  matricGrades: string;
  matricPicName?: string;
  fscGrades: string;
  fscPicName?: string;
  collegeName: string;
}

export interface ExtracurricularRequest {
  clubs: string;
  certDocName?: string;
}
