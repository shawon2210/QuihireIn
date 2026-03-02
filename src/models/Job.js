import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide job location'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Design', 'Other'],
    },
    description: {
      type: String,
      required: [true, 'Please provide job description'],
    },
    requirements: {
      type: String,
      required: [true, 'Please provide job requirements'],
    },
    salary: {
      type: String,
      required: false,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
      default: 'Full-time',
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
