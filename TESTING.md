# QuickHire Testing Guide

Complete testing guide for QuickHire application covering manual testing, API testing, and quality assurance.

## 🧪 Prerequisites

- Application running locally: `npm run dev`
- MongoDB connected
- All environment variables set in `.env.local`
- Postman (optional, for API testing)

---

## 🏠 Manual Testing - Home Page

### Test 1: Page Load

- [ ] Navigate to `http://localhost:3000`
- [ ] Page loads without errors
- [ ] Header appears with QuickHire logo
- [ ] Search bar visible
- [ ] Job listings display
- [ ] Footer appears

### Test 2: Search Functionality

- [ ] Enter text in search field (e.g., "React")
- [ ] Results update to match search term
- [ ] Clear search shows all jobs again
- [ ] Search works for title, company, and description

### Test 3: Category Filter

- [ ] Click category dropdown
- [ ] Select "Frontend"
- [ ] View updates to show only Frontend jobs
- [ ] Try other categories
- [ ] "All Categories" shows all jobs again

### Test 4: Location Filter

- [ ] Enter location in search field (e.g., "San Francisco")
- [ ] Results filter by location
- [ ] Case-insensitive search works
- [ ] Partial matches work

### Test 5: Combined Filters

- [ ] Enter search term AND select category
- [ ] Enter search term AND location
- [ ] All three filters together
- [ ] Filters work together correctly

### Test 6: Pagination

- [ ] If more than 9 jobs exist, pagination shows
- [ ] Click "Next" button
- [ ] Page increments and shows next jobs
- [ ] Click "Previous" button
- [ ] Page decrements properly
- [ ] Can click numbered pages directly

### Test 7: Job Cards

- [ ] Job title, company, and category display
- [ ] Location and job type show with icons
- [ ] Application count shows
- [ ] Card is clickable
- [ ] Hover effect works

### Test 8: Responsive Design

- [ ] Desktop view (1920px+)
  - [ ] Grid 3 columns
  - [ ] All elements visible
- [ ] Tablet view (768px)
  - [ ] Grid 2 columns
  - [ ] Mobile menu still accessible
- [ ] Mobile view (375px)
  - [ ] Grid 1 column
  - [ ] Search bar stacked
  - [ ] Layout responsive

---

## 💼 Manual Testing - Job Details Page

### Test 1: Access Job Details

- [ ] Click on any job card from home page
- [ ] Navigate to `/jobs/[id]`
- [ ] Page loads without errors
- [ ] "Back to Jobs" link visible

### Test 2: Job Information Display

- [ ] Job title displays
- [ ] Company name visible
- [ ] Location with icon
- [ ] Job type with icon
- [ ] Category badge
- [ ] Salary (if provided)
- [ ] Application count
- [ ] Posted date

### Test 3: Job Description

- [ ] Full job description visible
- [ ] Formatting preserved
- [ ] Readable font size

### Test 4: Requirements Section

- [ ] Requirements header shows
- [ ] Full requirements text visible
- [ ] Formatting preserved

### Test 4: Application Button

- [ ] "Apply Now" button visible
- [ ] Button has proper styling
- [ ] Button is clickable

### Test 5: Application Form Appears

- [ ] Click "Apply Now"
- [ ] Form appears on the page
- [ ] Name field present
- [ ] Email field present
- [ ] Resume link field present
- [ ] Cover note textarea present
- [ ] Submit button visible

---

## 📝 Manual Testing - Application Form

### Test 1: Form Validation - Required Fields

- [ ] Submit blank form → Error message shows
- [ ] Missing name → Error appears
- [ ] Missing email → Error appears
- [ ] Missing resume link → Error appears
- [ ] Missing cover note → Error appears

### Test 2: Email Validation

- [ ] Enter invalid email (e.g., "test@") → Error
- [ ] Enter valid email (e.g., "test@example.com") → Passes
- [ ] Error clears on input change

### Test 3: Resume Link Validation

- [ ] Enter non-URL text → Error
- [ ] Enter URL without protocol (e.g., "example.com") → Error
- [ ] Enter valid URL → Accepted
  - [ ] `https://example.com/resume.pdf` ✅
  - [ ] `http://example.com/resume` ✅
  - [ ] `https://drive.google.com/...` ✅

### Test 4: Cover Note Validation

- [ ] Very short text (1-9 chars) → Accepted (no max)
- [ ] Long text (>2000 chars) → Accepted (client-side + server validation)
- [ ] Character counter shows
- [ ] Updates as user types

### Test 5: Successful Submission

- [ ] Fill all fields correctly
- [ ] Click "Submit Application"
- [ ] Success message appears
- [ ] Form clears after submission
- [ ] Application count increases on job

### Test 6: Error Handling

- [ ] Network error → Appropriate error message
- [ ] Invalid job ID → Error from server
- [ ] Duplicate submission → Should succeed (allows multiple applications)

---

## 🔧 Manual Testing - Admin Panel

### Test 1: Access Admin Panel

- [ ] Navigate to `/admin`
- [ ] Page loads without errors
- [ ] Admin title visible
- [ ] "+ Post New Job" button visible
- [ ] All existing jobs display

### Test 2: Post New Job - Form Display

- [ ] Click "+ Post New Job"
- [ ] Form appears with all fields
- [ ] Title field visible
- [ ] Company field visible
- [ ] Location field visible
- [ ] Category dropdown visible with options
- [ ] Job Type dropdown visible
- [ ] Salary field visible
- [ ] Description textarea visible
- [ ] Requirements textarea visible
- [ ] "Post Job" button visible
- [ ] "Cancel" button visible

### Test 3: Post New Job - Validation

- [ ] Submit blank form → Error
- [ ] Missing required fields → Error message
- [ ] Enter valid data:
  - [ ] Title: "React Developer"
  - [ ] Company: "Tech Corp"
  - [ ] Location: "San Francisco, CA"
  - [ ] Category: "Frontend"
  - [ ] Job Type: "Full-time"
  - [ ] Salary: "$100k - $150k"
  - [ ] Description: "Full description..."
  - [ ] Requirements: "Required skills..."

### Test 4: Successful Job Creation

- [ ] Fill form correctly
- [ ] Click "Post Job"
- [ ] Success message shows
- [ ] Form clears
- [ ] New job appears in jobs list
- [ ] Job appears on home page
- [ ] New job is searchable

### Test 5: View Job in List

- [ ] New job appears in admin list
- [ ] Shows title, company, category
- [ ] Shows location, job type, application count
- [ ] Shows Edit, Delete, View buttons

### Test 6: Edit Job

- [ ] Click "Edit" button on job
- [ ] Form populates with job data
- [ ] Change title
- [ ] Change description
- [ ] Click "Update Job"
- [ ] Success message shows
- [ ] Job list updates with new data
- [ ] Home page reflects changes

### Test 7: Delete Job

- [ ] Click "Delete" button
- [ ] Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] Success message shows
- [ ] Job removed from list
- [ ] Job no longer accessible
- [ ] Can't access `/jobs/[deleted-id]`

### Test 8: Cancel Operations

- [ ] Click "+ Post New Job"
- [ ] Click "Cancel"
- [ ] Form disappears
- [ ] Can post new job again

### Test 9: Multiple Jobs

- [ ] Post 3+ jobs
- [ ] All display in list
- [ ] Can edit different jobs
- [ ] Can delete different jobs
- [ ] Application count updates

---

## 🔌 API Testing

### Using cURL

#### Test: Get All Jobs

```bash
curl http://localhost:3000/api/jobs
```

**Expected**: 200 status, array of jobs

#### Test: Search Jobs

```bash
curl "http://localhost:3000/api/jobs?search=React&category=Frontend"
```

**Expected**: 200 status, filtered jobs

#### Test: Get Single Job

```bash
curl http://localhost:3000/api/jobs/[job-id]
```

**Expected**: 200 status, single job object

#### Test: Create Job

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Job",
    "company": "Test Company",
    "location": "Test Location",
    "category": "Frontend",
    "description": "Test description",
    "requirements": "Test requirements"
  }'
```

**Expected**: 201 status, newly created job

#### Test: Update Job

```bash
curl -X PUT http://localhost:3000/api/jobs/[job-id] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "company": "Test Company",
    "location": "Test Location",
    "category": "Backend",
    "description": "Updated description",
    "requirements": "Updated requirements"
  }'
```

**Expected**: 200 status, updated job

#### Test: Delete Job

```bash
curl -X DELETE http://localhost:3000/api/jobs/[job-id]
```

**Expected**: 200 status, success message

#### Test: Submit Application

```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "[job-id]",
    "name": "John Doe",
    "email": "john@example.com",
    "resumeLink": "https://example.com/resume.pdf",
    "coverNote": "I am interested in this position..."
  }'
```

**Expected**: 201 status, saved application

#### Test: Get Applications

```bash
curl "http://localhost:3000/api/applications?jobId=[job-id]"
```

**Expected**: 200 status, array of applications

---

## 🧪 Error Testing

### Test 1: 404 Errors

- [ ] Visit `/jobs/invalid-id`
- [ ] Error message shows
- [ ] Can navigate back to home
- [ ] Visit `/invalid-page`
- [ ] 404 page appears

### Test 2: Validation Errors

- [ ] Post job with missing fields
- [ ] Appropriate error messages
- [ ] Submit application with invalid email
- [ ] Error message for email format

### Test 3: Database Errors

- [ ] Disconnect MongoDB
- [ ] Try to fetch jobs
- [ ] Error message appears
- [ ] Reconnect MongoDB
- [ ] Works again

### Test 4: API Error Responses

- [ ] Invalid job ID format
- [ ] Job ID that doesn't exist
- [ ] Missing required fields
- [ ] Proper HTTP status codes

---

## 📊 Performance Testing

### Test 1: Load Time

- [ ] Home page loads in < 3 seconds
- [ ] Job details page loads in < 2 seconds
- [ ] Admin panel loads in < 2 seconds

### Test 2: Search Performance

- [ ] Search with 100+ jobs < 1 second
- [ ] Filter operations responsive
- [ ] Pagination works smoothly

### Test 3: Large Data Sets

- [ ] Create 50+ jobs
- [ ] All display correctly
- [ ] Search still responsive
- [ ] Pagination works

### Test 4: Form Submission

- [ ] Application submit < 2 seconds
- [ ] Job creation < 2 seconds
- [ ] Job update < 2 seconds
- [ ] Job delete < 1 second

---

## 🔐 Security Testing

### Test 1: Input Validation

- [ ] XSS injection attempts blocked
- [ ] HTML in job title handled safely
- [ ] Special characters in search handled
- [ ] Long strings processed correctly

### Test 2: URL Validation

- [ ]`javascript:alert()` URL rejected
- [ ] `file://` protocol rejected
- [ ] Valid `http://` and `https://` accepted

### Test 3: Email Validation

- [ ] SQL injection in email rejected
- [ ] Special characters handled
- [ ] Valid email formats accepted

---

## ✅ Testing Checklist

### Frontend

- [ ] All pages render without errors
- [ ] Navigation works
- [ ] Forms validate correctly
- [ ] Search filters work
- [ ] Responsive design looks good
- [ ] Buttons are clickable
- [ ] Error messages display
- [ ] Success messages display

### Backend

- [ ] All API endpoints respond
- [ ] Data saves to database
- [ ] Validation works
- [ ] Error handling works
- [ ] Pagination works
- [ ] Search/filters work

### Database

- [ ] Jobs save correctly
- [ ] Applications save correctly
- [ ] Relationships work
- [ ] Data persists after refresh

### User Experience

- [ ] Clear error messages
- [ ] Success confirmations
- [ ] Loading states smooth
- [ ] Navigation intuitive
- [ ] Mobile experience good

---

## 🐛 Reporting Issues

When filing bug reports, include:

1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser/OS**
5. **Screenshots/console errors**

---

## 📝 Test Report Template

```markdown
## Test Session: [Date]

**Tester**: [Name]
**Environment**: Development
**Duration**: [Time]

### Tests Passed: X/Y

**Issues Found:**

1. Issue description
   - Severity: High/Medium/Low
   - Steps to reproduce
   - Expected vs actual

## **Recommendations:**
```

---

## 🎯 Coverage Goals

- Functional Coverage: 100%
- Edge Case Coverage: 80%
- Error Path Coverage: 100%
- Performance Coverage: 90%

---

For more help, see DEVELOPMENT.md or API.md
