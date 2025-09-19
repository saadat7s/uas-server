import mongoose, { Document, Schema } from 'mongoose';

export interface IFamily extends Document {
  userId: mongoose.Types.ObjectId;
  fatherName: string;
  motherName: string;
  fatherOccupation: 'govt' | 'non-govt';
  createdAt: Date;
  updatedAt: Date;
}

const familySchema = new Schema<IFamily>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  fatherName: {
    type: String,
    required: [true, 'Father\'s name is required'],
    trim: true,
    minlength: [2, 'Father\'s name must be at least 2 characters long'],
    maxlength: [100, 'Father\'s name cannot exceed 100 characters']
  },
  motherName: {
    type: String,
    required: [true, 'Mother\'s name is required'],
    trim: true,
    minlength: [2, 'Mother\'s name must be at least 2 characters long'],
    maxlength: [100, 'Mother\'s name cannot exceed 100 characters']
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father\'s occupation is required'],
    enum: ['govt', 'non-govt']
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
    }
  );

// Additional indexes for better query performance
familySchema.index({ createdAt: -1 });

export const Family = mongoose.model<IFamily>('Family', familySchema);
