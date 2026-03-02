import { connectDB } from '@/lib/mongodb';
import { Job } from '@/models/Job';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const job = await Job.findById(id);

      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }

      res.status(200).json({ success: true, data: job });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch job', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const job = await Job.findByIdAndDelete(id);

      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }

      res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete job', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, company, location, category, description, requirements, salary, jobType } = req.body;

      const job = await Job.findByIdAndUpdate(
        id,
        { title, company, location, category, description, requirements, salary, jobType },
        { new: true, runValidators: true }
      );

      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }

      res.status(200).json({ success: true, data: job, message: 'Job updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update job', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
