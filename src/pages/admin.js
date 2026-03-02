import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CATEGORIES = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Design', 'Other'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'];

export default function Admin() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    category: '',
    description: '',
    requirements: '',
    salary: '',
    jobType: 'Full-time',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/jobs?limit=100');

      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      if (editingId) {
        // Update job
        const response = await axios.put(`/api/jobs/${editingId}`, formData);
        if (response.data.success) {
          setMessage('✅ Job updated successfully!');
          setEditingId(null);
        }
      } else {
        // Create new job
        const response = await axios.post('/api/jobs', formData);
        if (response.data.success) {
          setMessage('✅ Job posted successfully!');
        }
      }

      setFormData({
        title: '',
        company: '',
        location: '',
        category: '',
        description: '',
        requirements: '',
        salary: '',
        jobType: 'Full-time',
      });
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to save job';
      setError(`❌ ${errorMsg}`);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      category: job.category,
      description: job.description,
      requirements: job.requirements,
      salary: job.salary || '',
      jobType: job.jobType,
    });
    setEditingId(job._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      const response = await axios.delete(`/api/jobs/${id}`);
      if (response.data.success) {
        setMessage('✅ Job deleted successfully!');
        fetchJobs();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete job';
      setError(`❌ ${errorMsg}`);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      company: '',
      location: '',
      category: '',
      description: '',
      requirements: '',
      salary: '',
      jobType: 'Full-time',
    });
  };

  return (
    <>
      <Head>
        <title>Admin Panel - QuickHire</title>
      </Head>

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage job listings and applications</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">{message}</div>
        )}
        {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {/* Post Job Section */}
        <div className="mb-8">
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              + Post New Job
            </button>
          )}

          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Job' : 'Post New Job'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="React Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Tech Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="input-field"
                    >
                      {JOB_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="$100k - $150k"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="input-field resize-none"
                    rows="6"
                    placeholder="Describe the job role, responsibilities, and day-to-day tasks..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements *</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                    className="input-field resize-none"
                    rows="6"
                    placeholder="List required skills, experience, and qualifications..."
                  />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary">
                    {editingId ? 'Update Job' : 'Post Job'}
                  </button>
                  <button type="button" onClick={handleCancel} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Jobs List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Jobs</h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No jobs posted yet. Create your first job!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <span className="badge-secondary">{job.category}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.jobType}</span>
                    <span>📧 {job.applicationsCount} applications</span>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEdit(job)}
                      className="btn-secondary text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="btn-danger text-sm"
                    >
                      Delete
                    </button>
                    <a
                      href={`/jobs/${job._id}`}
                      className="btn-secondary text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
