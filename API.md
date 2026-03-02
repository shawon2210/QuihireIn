# QuickHire API Reference

Quick reference guide for all API endpoints in QuickHire.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://yourdomain.com/api`

---

## Jobs Endpoints

### List All Jobs

```
GET /jobs
```

**Query Parameters:**

```
search    (string)   - Search in title, company, description
category  (string)   - Filter by job category
location  (string)   - Filter by location
page      (number)   - Page number (default: 1)
limit     (number)   - Items per page (default: 10)
```

**Example:**

```
GET /jobs?search=React&category=Frontend&page=1&limit=10
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "React Developer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "category": "Frontend",
      "description": "We are looking for...",
      "requirements": "Experience with React...",
      "salary": "$100k - $150k",
      "jobType": "Full-time",
      "applicationsCount": 5,
      "createdAt": "2024-03-01T10:00:00Z",
      "updatedAt": "2024-03-01T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "pages": 3,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

**Error (500):**

```json
{
  "success": false,
  "message": "Failed to fetch jobs",
  "error": "Error details"
}
```

---

### Get Single Job

```
GET /jobs/{id}
```

**Path Parameters:**

```
id (string) - MongoDB job ID
```

**Example:**

```
GET /jobs/507f1f77bcf86cd799439011
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "React Developer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "category": "Frontend",
    "description": "Full description...",
    "requirements": "Required skills...",
    "salary": "$100k - $150k",
    "jobType": "Full-time",
    "applicationsCount": 5,
    "createdAt": "2024-03-01T10:00:00Z",
    "updatedAt": "2024-03-01T10:00:00Z"
  }
}
```

**Error (404):**

```json
{
  "success": false,
  "message": "Job not found"
}
```

---

### Create New Job

```
POST /jobs
```

**Request Body:**

```json
{
  "title": "React Developer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "category": "Frontend",
  "description": "We are looking for an experienced React developer...",
  "requirements": "- 3+ years of React experience\n- Knowledge of Node.js\n- Experience with MongoDB",
  "salary": "$100k - $150k",
  "jobType": "Full-time"
}
```

**Required Fields:**

- title (max 100 chars)
- company
- location
- category (Frontend, Backend, Full Stack, Mobile, DevOps, Design, Other)
- description
- requirements
- jobType (Full-time, Part-time, Contract, Remote)

**Optional Fields:**

- salary

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "React Developer",
    ...
  },
  "message": "Job created successfully"
}
```

**Error (400):**

```json
{
  "success": false,
  "message": "Missing required fields"
}
```

---

### Update Job

```
PUT /jobs/{id}
```

**Path Parameters:**

```
id (string) - MongoDB job ID
```

**Request Body:**
Same as POST /jobs

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  },
  "message": "Job updated successfully"
}
```

**Error (404):**

```json
{
  "success": false,
  "message": "Job not found"
}
```

---

### Delete Job

```
DELETE /jobs/{id}
```

**Path Parameters:**

```
id (string) - MongoDB job ID
```

**Response (200):**

```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

**Error (404):**

```json
{
  "success": false,
  "message": "Job not found"
}
```

---

## Applications Endpoints

### Submit Application

```
POST /applications
```

**Request Body:**

```json
{
  "jobId": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://example.com/resume.pdf",
  "coverNote": "I am interested in this position because..."
}
```

**Required Fields:**

- jobId (valid MongoDB ID)
- name
- email (valid email format)
- resumeLink (must start with http:// or https://)
- coverNote (max 2000 chars)

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "jobId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "resumeLink": "https://example.com/resume.pdf",
    "coverNote": "I am interested...",
    "status": "pending",
    "createdAt": "2024-03-01T10:00:00Z",
    "updatedAt": "2024-03-01T10:00:00Z"
  },
  "message": "Application submitted successfully"
}
```

**Errors:**

Invalid email (400):

```json
{
  "success": false,
  "message": "Invalid email format"
}
```

Invalid URL (400):

```json
{
  "success": false,
  "message": "Resume link must be a valid URL"
}
```

Job not found (404):

```json
{
  "success": false,
  "message": "Job not found"
}
```

---

### Get Applications

```
GET /applications
```

**Query Parameters:**

```
jobId (string)  - Filter by job ID (optional)
page  (number)  - Page number (default: 1)
limit (number)  - Items per page (default: 10)
```

**Example:**

```
GET /applications?jobId=507f1f77bcf86cd799439011&page=1
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "jobId": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "React Developer",
        "company": "Tech Corp"
      },
      "name": "John Doe",
      "email": "john@example.com",
      "resumeLink": "https://example.com/resume.pdf",
      "coverNote": "I am interested...",
      "status": "pending",
      "createdAt": "2024-03-01T10:00:00Z",
      "updatedAt": "2024-03-01T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 10,
    "pages": 1,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

---

## Error Codes

| Code | Meaning                                |
| ---- | -------------------------------------- |
| 200  | Success (GET, PUT)                     |
| 201  | Created (POST)                         |
| 400  | Bad Request - validation error         |
| 404  | Not Found - resource doesn't exist     |
| 405  | Method Not Allowed - wrong HTTP method |
| 500  | Server Error - something went wrong    |

---

## Test with cURL

### Get all jobs

```bash
curl http://localhost:3000/api/jobs
```

### Search jobs

```bash
curl "http://localhost:3000/api/jobs?search=React&category=Frontend"
```

### Get single job

```bash
curl http://localhost:3000/api/jobs/507f1f77bcf86cd799439011
```

### Create job

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Developer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "category": "Frontend",
    "description": "We are looking for...",
    "requirements": "Required skills...",
    "salary": "$100k - $150k",
    "jobType": "Full-time"
  }'
```

### Submit application

```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "resumeLink": "https://example.com/resume.pdf",
    "coverNote": "I am interested in this position..."
  }'
```

### Delete job

```bash
curl -X DELETE http://localhost:3000/api/jobs/507f1f77bcf86cd799439011
```

---

## Rate Limiting

Currently not implemented. Recommended for production:

- 100 requests per minute per IP for public endpoints
- 10 requests per second per IP for job posting

---

## CORS

The API is configured for all origins in development. In production, configure for your specific domain.

---

## Validation Rules

### Job Title

- Required
- Max 100 characters
- Must not be empty

### Email (Application)

- Required
- Must be valid email format (name@domain.com)
- Example: john.doe@company.com ✅

### Resume Link (Application)

- Required
- Must be valid URL
- Must start with http:// or https://
- Example: https://example.com/resume.pdf ✅

### Cover Note (Application)

- Required
- Max 2000 characters
- Minimum 10 characters recommended

---

## API Response Format

All responses follow JSON format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Additional error details (optional)"
}
```

---

## Testing APIs

### Using Postman

1. Import the API endpoints
2. Set up environment variables
3. Create requests for each endpoint
4. Test with sample data

### Using Insomnia

1. Create requests for each endpoint
2. Set headers: `Content-Type: application/json`
3. Add request bodies as JSON
4. Test endpoints

### Using axios (JavaScript)

```javascript
import axios from "axios";

// Get jobs
const response = await axios.get("/api/jobs");

// Create job
await axios.post("/api/jobs", {
  title: "React Developer",
  // ... other fields
});

// Submit application
await axios.post("/api/applications", {
  jobId: "...",
  // ... other fields
});
```

---

For more details, see README.md or DEVELOPMENT.md
