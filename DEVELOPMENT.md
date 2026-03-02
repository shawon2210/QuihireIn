# QuickHire Development Guide

## Project Overview

QuickHire is a full-stack job board application built with modern web technologies. This guide helps developers understand the codebase structure and conventions.

## Getting Started for Developers

### Setup

```bash
git clone <your-repo>
cd QUICKHIRE
npm install
cp .env.example .env.local
# Edit .env.local with your MongoDB URI
npm run dev
```

## Architecture

### Frontend (React/Next.js)

- **Pages**: Located in `src/pages/`
- **Components**: Located in `src/components/`
- **Styling**: Tailwind CSS with `src/globals.css`

### Backend (Next.js API Routes)

- **API Routes**: Located in `src/pages/api/`
- **Database Models**: Located in `src/models/`
- **Utilities**: Located in `src/lib/`

## File Organization

```
src/
├── components/           # React Components
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Footer
│   ├── JobCard.jsx      # Job listing card
│   ├── SearchBar.jsx    # Search and filter
│   └── ApplicationForm.jsx  # Application form
├── models/              # MongoDB Schemas
│   ├── Job.js          # Job model
│   └── Application.js   # Application model
├── lib/                # Utilities
│   └── mongodb.js      # DB connection
├── pages/              # Pages & API routes
│   ├── api/            # API endpoints
│   ├── jobs/
│   │   └── [id].js    # Job detail page
│   ├── index.js       # Home page
│   ├── admin.js       # Admin panel
│   ├── _app.js        # App wrapper
│   └── _document.js   # Document template
└── globals.css        # Global styles
```

## Code Style & Conventions

### React Components

```jsx
// Use functional components
// Use meaningful names
// Props should be typed (optional: add PropTypes)
export default function ComponentName({ prop1, prop2 }) {
  return <div>{prop1}</div>;
}
```

### API Routes

```javascript
// Always handle both request methods and errors
export default async function handler(req, res) {
  if (req.method === "GET") {
    // Handle GET
  } else if (req.method === "POST") {
    // Handle POST
  } else {
    res.status(405).json({ success: false });
  }
}
```

### Styling

- Use Tailwind CSS utility classes
- Define custom styles in `@layer components` in globals.css
- Use CSS custom properties for colors when possible

## Database Schema

### Job

- Fields: title, company, location, category, description, requirements, salary, jobType, applicationsCount
- Indexes: title, company, location (for search performance)

### Application

- Fields: jobId (reference), name, email, resumeLink, coverNote, status
- Validation: Email format, URL validation for resumeLink

## API Conventions

### Response Format

```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, message: "Error description" }
```

### Status Codes

- `200`: GET success
- `201`: POST success
- `400`: Bad request / validation error
- `404`: Not found
- `405`: Method not allowed
- `500`: Server error

## Common Tasks

### Adding a New Job Field

1. Update `src/models/Job.js`
2. Update API endpoint in `src/pages/api/jobs/`
3. Update admin form in `src/pages/admin.js`
4. Update job card/detail views

### Adding New Filter

1. Update API query in `src/pages/api/jobs/index.js`
2. Add filter UI to `src/components/SearchBar.jsx`
3. Add filter parameter to home page state

### Creating New Page

1. Create file in `src/pages/`
2. Import components
3. Add to navigation in Header if needed
4. Import CSS if needed

## Testing Locally

### Test API Endpoints

```bash
# Using curl
curl http://localhost:3000/api/jobs

# Using Postman
Import API requests and test manually
```

### Test Admin Panel

1. Navigate to `/admin`
2. Create a test job
3. View on home page
4. Edit the job
5. Delete the job

### Test Applications

1. Find a job
2. Try submitting with invalid data (should see errors)
3. Submit with valid data (should see success)

## Environment Variables

### Development

```
MONGODB_URI=mongodb://localhost:27017/quickhire
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production

```
MONGODB_URI=mongodb+srv://user:pass@host/quickhire
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

## Debugging

### Client-Side

- Open browser DevTools (F12)
- Check Console tab for errors
- Use Network tab to see API requests/responses

### Server-Side

- Check terminal output while `npm run dev` is running
- Add `console.log()` statements in API routes
- Use browser DevTools Network tab to inspect requests

### Database

- Use MongoDB Atlas dashboard to view data
- Or use MongoDB Compass locally

## Performance Tips

1. Use pagination for large datasets
2. Add indexes to frequently searched fields
3. Minimize re-renders with proper state management
4. Compress images before upload
5. Cache API responses when appropriate

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes
git add .
git commit -m "Add feature description"

# Push to GitHub
git push origin feature/feature-name

# Create Pull Request on GitHub
```

## Common Issues & Solutions

| Issue                    | Solution                               |
| ------------------------ | -------------------------------------- |
| MongoDB connection error | Check MONGODB_URI and IP whitelist     |
| 404 on API routes        | Verify file path matches URL structure |
| Styles not loading       | Clear `.next` folder and rebuild       |
| State not updating       | Check React component lifecycle        |
| CORS errors              | Update NEXT_PUBLIC_API_URL             |

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Mongoose Docs](https://mongoosejs.com)

## Contributing

1. Follow the code style conventions
2. Test changes locally
3. Write clear commit messages
4. Update README if needed
5. Submit pull request

---

Happy coding! 🚀
