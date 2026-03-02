import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApplicationForm from '@/components/ApplicationForm';

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/jobs/${id}`);

      if (response.data.success) {
        setJob(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch job details. Please try again later.');
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
          <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist.'}</p>
          <a href="/" className="btn-primary">
            Back to Jobs
          </a>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{job.title} - QuickHire</title>
        <meta name="description" content={job.description} />
      </Head>

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <a href="/" className="text-primary font-semibold mb-6 inline-block hover:underline">
          ← Back to Jobs
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-xl text-gray-600">{job.company}</p>
                  </div>
                  <span className="badge-primary">{job.category}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                  <span className="flex items-center gap-2">📍 {job.location}</span>
                  <span className="flex items-center gap-2">💼 {job.jobType}</span>
                  {job.salary && <span className="flex items-center gap-2">💰 {job.salary}</span>}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this role</h2>
                <div className="text-gray-700 whitespace-pre-wrap mb-8 leading-relaxed">
                  {job.description}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {job.requirements}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Posted on {new Date(job.createdAt).toLocaleDateString()} • {job.applicationsCount} applications
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            {showApplicationForm ? (
              <ApplicationForm
                jobId={job._id}
                onSubmit={() => {
                  setShowApplicationForm(false);
                  fetchJobDetails();
                }}
              />
            ) : (
              <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="btn-primary w-full mb-3"
                >
                  Apply Now
                </button>
                <p className="text-center text-sm text-gray-600">
                  Ready to take the next step in your career?
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
