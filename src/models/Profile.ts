import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  primaryLang: string;
  citizen: 'PK' | 'Non-PK';
  cnic: string;
  gender: 'Male' | 'Female';
  dob: Date;
  maritalStatus: 'Married' | 'Unmarried';
  phone: string;
  photoName?: string;
  photoBytes?: number;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'First name must be at least 1 character long'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [50, 'Middle name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [1, 'Last name must be at least 1 character long'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    minlength: [10, 'Address must be at least 10 characters long'],
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  primaryLang: {
    type: String,
    required: [true, 'Primary language is required'],
    enum: ['en', 'ur'],
    default: 'en'
  },
  citizen: {
    type: String,
    required: [true, 'Citizen status is required'],
    enum: ['PK', 'Non-PK']
  },
  cnic: {
    type: String,
    required: [true, 'CNIC is required'],
    trim: true,
    match: [/^\d{5}-\d{7}-\d{1}$/, 'Please enter a valid CNIC format (XXXXX-XXXXXXX-X)'],
    unique: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value: Date) {
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        const monthDiff = today.getMonth() - value.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
          return age - 1 >= 16; // Minimum age 16
        }
        return age >= 16;
      },
      message: 'User must be at least 16 years old'
    }
  },
  maritalStatus: {
    type: String,
    required: [true, 'Marital status is required'],
    enum: ['Married', 'Unmarried']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  photoName: {
    type: String,
    trim: true
  },
  photoBytes: {
    type: Number,
    min: [0, 'Photo size cannot be negative'],
    max: [5 * 1024 * 1024, 'Photo size cannot exceed 5MB']
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete (ret as any)._id;
      delete (ret as any).__v;
      return ret;
    }
  }
});

// Additional indexes for better query performance
profileSchema.index({ createdAt: -1 });
profileSchema.index({ cnic: 1 });

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);
