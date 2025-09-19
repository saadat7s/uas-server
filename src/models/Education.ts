import mongoose, { Document, Schema } from 'mongoose';

export interface IEducation extends Document {
  userId: mongoose.Types.ObjectId;
  matricGrades: string;
  matricPicName?: string;
  fscGrades: string;
  fscPicName?: string;
  collegeName: string;
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new Schema<IEducation>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  matricGrades: {
    type: String,
    required: [true, 'Matric grades are required'],
    trim: true,
    minlength: [1, 'Matric grades must be provided'],
    maxlength: [200, 'Matric grades cannot exceed 200 characters']
  },
  matricPicName: {
    type: String,
    trim: true
  },
  fscGrades: {
    type: String,
    required: [true, 'FSC grades are required'],
    trim: true,
    minlength: [1, 'FSC grades must be provided'],
    maxlength: [200, 'FSC grades cannot exceed 200 characters']
  },
  fscPicName: {
    type: String,
    trim: true
  },
  collegeName: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    minlength: [2, 'College name must be at least 2 characters long'],
    maxlength: [200, 'College name cannot exceed 200 characters']
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
educationSchema.index({ createdAt: -1 });

export const Education = mongoose.model<IEducation>('Education', educationSchema);
