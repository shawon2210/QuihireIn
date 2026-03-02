# QuickHire - Quick Start Guide

Get QuickHire running in 5 minutes!

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn installed
- MongoDB instance (local or cloud)

## ⚡ 5-Minute Setup

### 1️⃣ Install Dependencies (2 min)

```bash
cd QUICKHIRE
npm install
```

### 2️⃣ Configure Database (1 min)

Create `.env.local` with:

**Option A: Local MongoDB**

```
MONGODB_URI=mongodb://localhost:27017/quickhire
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create free cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/quickhire`
4. Paste into `.env.local`

### 3️⃣ Start Development Server (1 min)

```bash
npm run dev
```

### 4️⃣ Open in Browser

- **Home Page**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 🎯 First Steps

### Create Your First Job

1. Go to http://localhost:3000/admin
2. Click **"+ Post New Job"**
3. Fill in the form:
   - Title: "Frontend Engineer"
   - Company: "Your Company"
   - Location: "Remote"
   - Category: "Frontend"
   - Description: "Looking for experienced frontend dev..."
   - Requirements: "React, TypeScript, CSS..."
4. Click **"Post Job"**

### View Jobs

1. Go to http://localhost:3000
2. See your job in the listing
3. Click on it to view details

### Apply for a Job

1. Click on any job
2. Click **"Apply Now"**
3. Fill in application form
4. Submit

---

## 🔧 Troubleshooting

**Problem**: Installation fails

```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: MongoDB connection error

- Check `MONGODB_URI` is correct
- If using MongoDB Atlas, whitelist your IP address
- Ensure username/password are URL-encoded

**Problem**: Port 3000 already in use

```bash
npm run dev -- -p 3001
```

**Problem**: Styles not loading

```bash
rm -rf .next
npm run dev
```

---

## 📚 Documentation

- **README.md** - Full documentation
- **DEVELOPMENT.md** - Developer guide
- **DEPLOYMENT.md** - Deploy to production
- **API.md** - API reference
- **TESTING.md** - Testing guide
- **PROJECT_SUMMARY.md** - Project overview

---

## 🚀 Ready to Deploy?

See **DEPLOYMENT.md** for:

- Vercel deployment (2 minutes)
- Railway deployment
- Render deployment
- Self-hosted options

---

## 💡 Key Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🎨 UI Overview

- **Home Page**: Browse and search jobs
- **Job Details**: View full job info and apply
- **Admin Panel**: Post, edit, delete jobs
- **Footer**: About and links

---

## 📡 Main API Endpoints

```
GET    /api/jobs                    # List all jobs
POST   /api/jobs                    # Create job (admin)
GET    /api/jobs/[id]               # Get job details
PUT    /api/jobs/[id]               # Update job (admin)
DELETE /api/jobs/[id]               # Delete job (admin)
POST   /api/applications            # Submit application
GET    /api/applications            # List applications
```

---

## ✨ Features

✅ Browse jobs  
✅ Search jobs  
✅ Filter by category/location  
✅ Apply for jobs  
✅ Post jobs (admin)  
✅ Manage jobs (admin)  
✅ Responsive design

---

## 📞 Need Help?

1. Check DEVELOPMENT.md for guides
2. See TESTING.md for how to test
3. Review API.md for API details
4. Check browser console (F12) for errors
5. Check server logs in terminal

---

## 🎉 Next Steps

1. ✅ Install and run locally
2. 👨‍💼 Create sample jobs
3. 📝 Test applications
4. 🧪 Run through TESTING.md
5. 🚀 Deploy to production

---

**Happy Coding! 🚀**

Questions? See the full documentation in README.md
