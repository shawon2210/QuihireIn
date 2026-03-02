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

          {/* Explore by Category Section */}
          <section className="py-16 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">
                  Explore by <span className="text-blue-600">category</span>
                </h2>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                  Show all jobs <span>→</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Design', icon: '✕', jobs: 235 },
                  { name: 'Sales', icon: '📊', jobs: 756 },
                  { name: 'Marketing', icon: '📢', jobs: 140, featured: true },
                  { name: 'Finance', icon: '💼', jobs: 325 },
                  { name: 'Technology', icon: '💻', jobs: 436 },
                  { name: 'Engineering', icon: '</>', jobs: 542 },
                  { name: 'Business', icon: '💼', jobs: 211 },
                  { name: 'Human Resource', icon: '👥', jobs: 346 },
                ].map((category) => (
                  <div
                    key={category.name}
                    className={`p-6 rounded-lg border transition-all cursor-pointer ${
                      category.featured
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white border-gray-200 hover:shadow-lg hover:border-gray-300'
                    }`}
                  >
                    <div className={`text-4xl mb-4 ${category.featured ? 'text-white' : 'text-blue-600'}`}>
                      {category.icon}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${category.featured ? 'text-white' : 'text-gray-900'}`}>
                      {category.name}
                    </h3>
                    <div className={`flex items-center gap-2 ${category.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                      <span>{category.jobs} jobs available</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="200" fill="white" />
              </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-white">
                  <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                    Start posting jobs today
                  </h2>
                  <p className="text-xl mb-8 text-blue-100">
                    Start posting jobs for only $10.
                  </p>
                  <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                    Sign Up For Free
                  </button>
                </div>

                {/* Right Content - Dashboard Preview */}
                <div className="hidden lg:block">
                  <div className="relative">
                    {/* Subtle shadow/depth effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-xl opacity-20 blur-xl"></div>
                    
                    {/* Dashboard mockup card */}
                    <div className="relative bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm font-semibold text-gray-700">QuickHire</span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                          + Post a job
                        </button>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <span className="font-semibold text-gray-900">Good morning, Maria</span>
                        <p className="text-xs">Here is your job listings statistics report from...</p>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <div className="text-2xl font-bold">76</div>
                          <div className="text-xs">New candidates to review</div>
                        </div>
                        <div className="bg-green-400 text-white p-3 rounded-lg">
                          <div className="text-2xl font-bold">3</div>
                          <div className="text-xs">Schedule for today</div>
                        </div>
                        <div className="bg-cyan-400 text-white p-3 rounded-lg">
                          <div className="text-2xl font-bold">24</div>
                          <div className="text-xs">Messages received</div>
                        </div>
                      </div>

                      {/* Chart placeholder */}
                      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-4 h-40 flex items-end justify-center gap-2">
                        {[40, 65, 45, 70, 50, 60, 55, 45].map((height, i) => (
                          <div
                            key={i}
                            className={`flex-1 bg-blue-600 rounded-t opacity-70 hover:opacity-100 transition-opacity`}
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Jobs Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12 pb-6 border-b-2 border-dashed border-gray-300">
                <h2 className="text-4xl font-bold text-gray-900">
                  Featured <span className="text-blue-600">jobs</span>
                </h2>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                  Show all jobs <span>→</span>
                </a>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: 'ℝ',
                      title: 'Email Marketing',
                      company: 'Revolut',
                      location: 'Madrid, Spain',
                      description: 'Revolut is looking for Email Marketing to help team ma...',
                      tags: ['Marketing', 'Design'],
                      type: 'Full Time'
                    },
                    {
                      icon: '◆◆',
                      title: 'Brand Designer',
                      company: 'Dropbox',
                      location: 'San Fransisco, US',
                      description: 'Dropbox is looking for Brand Designer to help the team t...',
                      tags: ['Design', 'Business'],
                      type: 'Full Time'
                    },
                    {
                      icon: '◉',
                      title: 'Email Marketing',
                      company: 'Pitch',
                      location: 'Berlin, Germany',
                      description: 'Pitch is looking for Customer Manager to join marketing t...',
                      tags: ['Marketing'],
                      type: 'Full Time'
                    },
                    {
                      icon: '●',
                      title: 'Visual Designer',
                      company: 'Blinklist',
                      location: 'Granada, Spain',
                      description: 'Blinklist is looking for Visual Designer to help team desi...',
                      tags: ['Design'],
                      type: 'Full Time'
                    },
                    {
                      icon: '∞',
                      title: 'Product Designer',
                      company: 'ClassPass',
                      location: 'Manchester, UK',
                      description: 'ClassPass is looking for Product Designer to help us...',
                      tags: ['Marketing', 'Design'],
                      type: 'Full Time'
                    },
                    {
                      icon: '◉',
                      title: 'Lead Designer',
                      company: 'Canva',
                      location: 'Ontario, Canada',
                      description: 'Canva is looking for Lead Engineer to help develop n...',
                      tags: ['Design', 'Business'],
                      type: 'Full Time'
                    },
                    {
                      icon: '◊',
                      title: 'Brand Strategist',
                      company: 'GoDaddy',
                      location: 'Marseille, France',
                      description: 'GoDaddy is looking for Brand Strategist to join the team...',
                      tags: ['Marketing'],
                      type: 'Full Time'
                    },
                    {
                      icon: '𝕏',
                      title: 'Data Analyst',
                      company: 'Twitter',
                      location: 'San Diego, US',
                      description: 'Twitter is looking for Data Analyst to help team desi...',
                      tags: ['Technology'],
                      type: 'Full Time'
                    },
                  ].map((job, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl font-bold text-gray-800 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                          {job.icon}
                        </div>
                        <span className="border border-blue-600 text-blue-600 text-xs font-semibold px-3 py-1 rounded">
                          {job.type}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {job.title}
                      </h3>

                      {/* Company and Location */}
                      <p className="text-gray-600 text-sm mb-3">
                        <span className="font-semibold">{job.company}</span> • {job.location}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              tag === 'Business'
                                ? 'bg-blue-100 text-blue-600'
                                : tag === 'Technology'
                                ? 'bg-red-100 text-red-600'
                                : tag === 'Design'
                                ? 'bg-cyan-100 text-cyan-600'
                                : 'bg-yellow-100 text-yellow-600'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

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
