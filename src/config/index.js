/**
 * QuickHire Configuration
 * Centralized configuration for the application
 */

export const config = {
  // Application Name
  appName: 'QuickHire',
  appTagline: 'Find Your Next Opportunity',
  appDescription: 'A simple job board application for browsing and applying to jobs',

  // URLs
  urls: {
    home: '/',
    jobs: '/jobs',
    admin: '/admin',
  },

  // Job Categories
  jobCategories: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Design', 'Other'],

  // Job Types
  jobTypes: ['Full-time', 'Part-time', 'Contract', 'Remote'],

  // Application Status
  applicationStatus: ['pending', 'reviewed', 'rejected', 'accepted'],

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Validation Rules
  validation: {
    jobTitle: {
      minLength: 3,
      maxLength: 100,
    },
    jobDescription: {
      minLength: 20,
    },
    jobRequirements: {
      minLength: 20,
    },
    coverNote: {
      minLength: 10,
      maxLength: 2000,
    },
    name: {
      minLength: 2,
      maxLength: 100,
    },
  },

  // Colors
  colors: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    accent: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000, // 10 seconds
  },

  // UI Configuration
  ui: {
    pageSize: 9, // Jobs per page on home page
    adminPageSize: 20, // Jobs per admin page
  },

  // Feature Flags
  features: {
    enableApplications: true,
    enableSearch: true,
    enableFilters: true,
    enableAdmin: true,
    enablePagination: true,
  },
};

export default config;
