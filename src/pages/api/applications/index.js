import { connectDB } from '@/lib/mongodb';
import { Application } from '@/models/Application';
import { Job } from '@/models/Job';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { jobId, page = 1, limit = 10 } = req.query;

      let filter = {};
      if (jobId) {
        filter.jobId = jobId;
      }

      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const skip = (pageNum - 1) * limitNum;

      const total = await Application.countDocuments(filter);
      const applications = await Application.find(filter)
        .populate('jobId', 'title company')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      res.status(200).json({
        success: true,
        data: applications,
        pagination: {
          total,
          pages: Math.ceil(total / limitNum),
          currentPage: pageNum,
          pageSize: limitNum,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch applications', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { jobId, name, email, resumeLink, coverNote } = req.body;

      // Validation
      if (!jobId || !name || !email || !resumeLink || !coverNote) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
      }

      // URL validation
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(resumeLink)) {
        return res.status(400).json({ success: false, message: 'Resume link must be a valid URL' });
      }

      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }

      const newApplication = new Application({
        jobId,
        name,
        email,
        resumeLink,
        coverNote,
      });

      const savedApplication = await newApplication.save();

      // Update job applications count
      await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

      res.status(201).json({
        success: true,
        data: savedApplication,
        message: 'Application submitted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to submit application',
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
