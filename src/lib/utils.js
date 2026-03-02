/**
 * Utility functions for QuickHire API
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidUrl = (url) => {
  const urlRegex = /^https?:\/\/.+/;
  return urlRegex.test(url);
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Length to truncate to
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format salary range
 * @param {string} salary - Salary string
 * @returns {string} - Formatted salary
 */
export const formatSalary = (salary) => {
  if (!salary) return 'Competitive';
  return salary;
};

/**
 * Get color for job category
 * @param {string} category - Job category
 * @returns {string} - Tailwind color class
 */
export const getCategoryColor = (category) => {
  const colors = {
    Frontend: 'bg-blue-100 text-blue-800',
    Backend: 'bg-purple-100 text-purple-800',
    'Full Stack': 'bg-green-100 text-green-800',
    Mobile: 'bg-pink-100 text-pink-800',
    DevOps: 'bg-orange-100 text-orange-800',
    Design: 'bg-red-100 text-red-800',
    Other: 'bg-gray-100 text-gray-800',
  };
  return colors[category] || colors.Other;
};

/**
 * Get icon for job type
 * @param {string} jobType - Job type
 * @returns {string} - Icon emoji
 */
export const getJobTypeIcon = (jobType) => {
  const icons = {
    'Full-time': '💼',
    'Part-time': '⏰',
    Contract: '📋',
    Remote: '🌐',
  };
  return icons[jobType] || '💼';
};
