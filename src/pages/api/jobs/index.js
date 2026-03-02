import { connectDB } from '@/lib/mongodb';
import { Job } from '@/models/Job';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Get search and filter parameters
      const { search = '', category = '', location = '', page = 1, limit = 10 } = req.query;

      let filter = {};

      // Add search filter (title, company, description)
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      // Add category filter
      if (category && category !== 'All') {
        filter.category = category;
      }

      // Add location filter
      if (location) {
        filter.location = { $regex: location, $options: 'i' };
      }

      // Calculate pagination
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const skip = (pageNum - 1) * limitNum;

      // Get total count for pagination
      const total = await Job.countDocuments(filter);

      // Get jobs with filters and pagination
      const jobs = await Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum);

      res.status(200).json({
        success: true,
        data: jobs,
        pagination: {
          total,
          pages: Math.ceil(total / limitNum),
          currentPage: pageNum,
          pageSize: limitNum,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch jobs', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, company, location, category, description, requirements, salary, jobType } = req.body;

      // Validation
      if (!title || !company || !location || !category || !description || !requirements) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const newJob = new Job({
        title,
        company,
        location,
        category,
        description,
        requirements,
        salary,
        jobType,
      });

      const savedJob = await newJob.save();
      res.status(201).json({ success: true, data: savedJob, message: 'Job created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create job', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
