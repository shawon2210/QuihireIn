# QuickHire - Simple Job Board Application

A modern, fully-functional job board application built with Next.js, React, MongoDB, and Tailwind CSS. Post jobs, search for opportunities, filter by category/location, and apply with an intuitive user interface.

## 🌟 Features

### For Job Seekers

- **Browse Job Listings**: View all available job opportunities in a clean, card-based layout
- **Advanced Search**: Search jobs by title, company name, and description
- **Filter by Category**: Find jobs by role type (Frontend, Backend, Full Stack, Mobile, DevOps, Design)
- **Filter by Location**: Search for jobs in specific locations
- **View Job Details**: See complete job descriptions, requirements, and apply directly
- **Submit Applications**: Apply with name, email, resume link, and cover note
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile

### For Admin Users

- **Post Jobs**: Create new job listings with detailed information
- **Edit Jobs**: Update existing job listings
- **Delete Jobs**: Remove job listings
- **View Applications**: Track application count for each job
- **Job Management Dashboard**: Manage all jobs from a single admin panel

### Backend API

- **RESTful API**: Clean, standard API endpoints
- **Input Validation**: Comprehensive validation on all endpoints
- **Error Handling**: Proper error responses with meaningful messages
- **Pagination**: Support for paginated job listings
- **Email Validation**: Validates email format on applications
- **URL Validation**: Ensures resume links are valid URLs

## 🛠️ Tech Stack

### Frontend

- **Next.js 14**: React framework with built-in routing and server-side rendering
- **React 18**: UI library
- **Tailwind CSS 3**: Utility-first CSS framework
- **Axios**: HTTP client for API requests

### Backend

- **Next.js API Routes**: Serverless backend functions
- **Node.js**: JavaScript runtime
- **Express**: Built-in with Next.js API routes

### Database

- **MongoDB**: NoSQL database for storing jobs and applications
- **Mongoose**: MongoDB ODM for schema definition and validation

## 📋 Requirements

- Node.js 16+
- npm or yarn
- MongoDB instance (local or cloud)
- Internet connection

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd QUICKHIRE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickhire

# Node Environment
NODE_ENV=development

# API URL (for client-side requests)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**For MongoDB Setup:**

- **Local MongoDB**: `MONGODB_URI=mongodb://localhost:27017/quickhire`
- **MongoDB Atlas** (Cloud):
  1. Create a free cluster at [mongodb.com/cloud](https://www.mongodb.com/cloud)
  2. Get your connection string from Atlas dashboard
  3. Use it in `MONGODB_URI`

### 4. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### 5. Access the Application

- **Job Listings**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Documentation**: See API Endpoints section below

## 🏗️ Project Structure

```
QUICKHIRE/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── JobCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── ApplicationForm.jsx
│   ├── models/              # MongoDB Mongoose schemas
│   │   ├── Job.js
│   │   └── Application.js
│   ├── lib/                 # Utility functions
│   │   └── mongodb.js       # Database connection
│   ├── pages/
│   │   ├── index.js         # Home page with job listings
│   │   ├── jobs/
│   │   │   └── [id].js      # Job detail page
│   │   ├── admin.js         # Admin panel
│   │   ├── api/
│   │   │   ├── jobs/
│   │   │   │   ├── index.js # GET all jobs, POST new job
│   │   │   │   └── [id].js  # GET/PUT/DELETE single job
│   │   │   └── applications/
│   │   │       └── index.js # POST application, GET applications
│   │   ├── _app.js
│   │   └── _document.js
│   └── globals.css          # Global styles and Tailwind config
├── public/                  # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example            # Example environment variables
```

## 📡 API Endpoints

### Jobs

```
GET /api/jobs
- Get all jobs with pagination and filters
- Query params: search, category, location, page, limit

POST /api/jobs
- Create a new job
- Body: { title, company, location, category, description, requirements, salary, jobType }

GET /api/jobs/[id]
- Get single job details
- Params: id (job ID)

PUT /api/jobs/[id]
- Update a job
- Params: id (job ID)
- Body: same as POST

DELETE /api/jobs/[id]
- Delete a job
- Params: id (job ID)
```

### Applications

```
POST /api/applications
- Submit a job application
- Body: { jobId, name, email, resumeLink, coverNote }

GET /api/applications
- Get all applications
- Query params: jobId (optional), page, limit
```

## 📊 Database Schema

### Job Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  company: String (required),
  location: String (required),
  category: String (enum: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Design', 'Other']),
  description: String (required),
  requirements: String (required),
  salary: String (optional),
  jobType: String (enum: ['Full-time', 'Part-time', 'Contract', 'Remote']),
  applicationsCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Application Model

```javascript
{
  _id: ObjectId,
  jobId: ObjectId (reference to Job),
  name: String (required),
  email: String (required, validated),
  resumeLink: String (required, URL format),
  coverNote: String (required, max 2000 chars),
  status: String (enum: ['pending', 'reviewed', 'rejected', 'accepted'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

## ✅ Validation Rules

### Job Posting

- Title: Required, max 100 characters
- Company: Required, trimmed
- Location: Required, trimmed
- Category: Required, must be one of predefined categories
- Description: Required
- Requirements: Required
- Job Type: Must be one of ['Full-time', 'Part-time', 'Contract', 'Remote']

### Job Application

- Name: Required
- Email: Required, must be valid email format
- Resume Link: Required, must start with http:// or https://
- Cover Note: Required, max 2000 characters

## 🎨 UI/UX Features

- **Clean Design**: Modern, minimalist interface following best practices
- **Color Scheme**: Professional blues with supporting grays and accent colors
- **Typography**: Consistent font family and sizing hierarchy
- **Responsive Layout**: Mobile-first approach with breakpoints for tablet and desktop
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Error Handling**: User-friendly error messages with clear feedback
- **Success Feedback**: Confirmation messages for successful actions

## 🔒 Security & Best Practices

- Input validation on all endpoints
- Email format validation
- URL validation for resume links
- Proper error handling with appropriate HTTP status codes
- No sensitive data exposed in API responses
- Environment variable configuration for sensitive data

## 📦 Build & Deployment

### Production Build

```bash
npm run build
npm start
```

### Deployment Platforms

- **Vercel** (Recommended for Next.js): [vercel.com](https://vercel.com)
- **Railway**: [railway.app](https://railway.app)
- **Render**: [render.com](https://render.com)
- **AWS**: EC2 or Elastic Beanstalk
- **DigitalOcean**: App Platform or Droplets

**Note for MongoDB Atlas**: When deploying, ensure your MongoDB Atlas IP whitelist includes your deployment server's IP.

## 🚀 Future Enhancements

- User authentication and profiles
- Job favoriting and saved applications
- Email notifications for applications
- Advanced analytics dashboard
- Job recommendations based on history
- Social sharing features
- Application status tracking for candidates
- Resume parsing and validation
- Video interview integration

## 📝 Git Commit History

The project includes a clean commit history showing incremental development:

1. Initial project setup with Next.js and dependencies
2. Database models and schemas
3. API endpoints implementation
4. Frontend components and pages
5. Admin panel functionality
6. Styling and responsive design
7. Final testing and documentation

## 🤝 Contributing

This is a demonstration project. For personal modifications:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📞 Support

For issues or questions:

1. Check existing GitHub issues
2. Review the troubleshooting section in documentation
3. Check .env configuration
4. Ensure MongoDB connection string is correct
5. Verify all dependencies are installed

## 📄 License

This project is open source and available under the MIT License.

## ⭐ Quick Tips

- **MongoDB Connection Issues?** Ensure your IP is whitelisted on MongoDB Atlas (or use 0.0.0.0/0 for development)
- **API Errors?** Check browser console and server logs for detailed error messages
- **Styling Issues?** Clear Next.js cache with `rm -rf .next` and rebuild
- **Port Conflicts?** Change port with `npm run dev -- -p 3001`

## 🎯 Usage Examples

### Post a Job

1. Navigate to `/admin`
2. Click "+ Post New Job"
3. Fill in job details
4. Click "Post Job"

### Apply for a Job

1. Navigate to home page (`/`)
2. Search or filter jobs
3. Click on a job card
4. Click "Apply Now"
5. Fill in application form
6. Submit

### Manage Jobs

1. Go to `/admin`
2. View all posted jobs
3. Edit or delete as needed
4. Track application counts

---

**Built with ❤️ for modern recruitment**
