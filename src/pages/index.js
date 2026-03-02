import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, category, location, currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        category,
        location,
        page: currentPage,
        limit: 9,
      };

      const response = await axios.get('/api/jobs', { params });

      if (response.data.success) {
        setJobs(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>QuickHire - Find Your Next Job</title>
        <meta name="description" content="Browse and apply to job listings on QuickHire" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />

        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                  <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                    Discover more than{' '}
                    <span className="text-blue-600">5000+ Jobs</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Great platform for the job seeker that searching for new career heights and passionate about startups.
                  </p>

                  <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Popular :</p>
                    <div className="flex flex-wrap gap-3">
                      {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Content - Placeholder for Image */}
                <div className="hidden lg:flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl opacity-10 blur-3xl"></div>
                    <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-blue-600 mb-4">👨‍💼</div>
                        <p className="text-gray-600 font-medium">Your career journey starts here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SearchBar
              onSearch={setSearchTerm}
              onCategoryChange={setCategory}
              onLocationChange={setLocation}
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center max-w-7xl mx-auto">{error}</div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        page === currentPage
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                    disabled={currentPage === pagination.pages}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
