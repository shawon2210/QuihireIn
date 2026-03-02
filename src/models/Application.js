import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    resumeLink: {
      type: String,
      required: [true, 'Please provide a resume link'],
      match: [/^https?:\/\/.+/, 'Resume link must be a valid URL'],
    },
    coverNote: {
      type: String,
      required: [true, 'Please provide a cover note'],
      maxlength: [2000, 'Cover note cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'rejected', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
