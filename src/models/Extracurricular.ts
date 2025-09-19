import mongoose, { Document, Schema } from 'mongoose';

export interface IExtracurricular extends Document {
  userId: mongoose.Types.ObjectId;
  clubs: string;
  certDocName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const extracurricularSchema = new Schema<IExtracurricular>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  clubs: {
    type: String,
    required: [true, 'Clubs information is required'],
    trim: true,
    minlength: [1, 'Clubs information must be provided'],
    maxlength: [500, 'Clubs information cannot exceed 500 characters']
  },
  certDocName: {
    type: String,
    trim: true
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
extracurricularSchema.index({ createdAt: -1 });

export const Extracurricular = mongoose.model<IExtracurricular>('Extracurricular', extracurricularSchema);
