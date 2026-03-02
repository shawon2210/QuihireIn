# QuickHire Deployment Guide

This guide provides step-by-step instructions for deploying the QuickHire application to various platforms.

## Prerequisites

- GitHub repository with QuickHire code
- MongoDB Atlas account (Free tier available)
- Deployment platform account (Vercel, Railway, or Render)

## Environment Variables Required

For all deployments, you'll need:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickhire
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

## 🚀 Deployment Option 1: Vercel (Recommended for Next.js)

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Import Project"
4. Select your QuickHire GitHub repository
5. Click "Import"

### Step 2: Configure Environment Variables

1. On the Vercel import page, expand "Environment Variables"
2. Add the following:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_API_URL`: Your Vercel domain (e.g., `https://quickhire.vercel.app/api`)

### Step 3: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (typically 2-3 minutes)
3. Your app will be live at `https://quickhire.vercel.app`

### Updating Deployment

- Simply push changes to main/master branch
- Vercel automatically redeploys

---

## 🚀 Deployment Option 2: Railway

### Step 1: Set Up MongoDB on Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project
4. Select "MongoDB" plugin
5. Click "Add" to provision MongoDB

### Step 2: Set Up Next.js App

1. Create new Railway project
2. Select "Deploy from GitHub"
3. Connect your GitHub account
4. Select QuickHire repository

### Step 3: Configure Environment Variables

In Railway Dashboard:

1. Go to "Variables" tab
2. Click "Create Variable"
3. Add `MONGODB_URI`: Copy from MongoDB plugin created earlier
4. Add `NEXT_PUBLIC_API_URL`: Your Railway domain
5. Add `NODE_ENV`: `production`

### Step 4: Configure Build & Start

Railway should auto-detect Next.js, but verify:

- Build Command: `npm run build`
- Start Command: `npm run start`

### Step 5: Deploy

1. Push changes to GitHub
2. Railway auto-deploys on push

---

## 🚀 Deployment Option 3: Render

### Step 1: Create MongoDB on Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Create a new MongoDB database
4. Note the connection string

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Select QuickHire repo
4. Configure settings:
   - Name: `quickhire`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

### Step 3: Add Environment Variables

1. Go to "Environment" tab
2. Add:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_API_URL`: Your Render URL (e.g., `https://quickhire.onrender.com/api`)

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. App will be live

---

## 🌍 MongoDB Atlas Setup (Cloud Database)

### Step 1: Create Free Cluster

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Click "Try Free"
3. Sign up or log in
4. Click "Create Deployment"
5. Select "M0 Shared" (Free tier)
6. Choose region closest to your deployment
7. Click "Create Deployment"

### Step 2: Set Up Database Access

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Click "Create User"

### Step 3: Set Up Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Add your IP
4. For production: Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Databases" → Your Cluster
2. Click "Connect"
3. Select "Drivers"
4. Choose "Node.js"
5. Copy connection string
6. Replace `<username>`, `<password>`, and `<database>` with your values

### Example Connection String

```
mongodb+srv://username:password@cluster0.mongodb.net/quickhire?retryWrites=true&w=majority
```

---

## 🔧 Local Deployment (Self-Hosted)

### Prerequisites

- Ubuntu/Linux server
- Node.js 16+ installed
- MongoDB installed locally or use Atlas
- PM2 for process management

### Step 1: SSH into Server

```bash
ssh user@your-server-ip
```

### Step 2: Clone Repository

```bash
git clone https://github.com/your-username/quickhire.git
cd quickhire
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Create .env.production

```bash
nano .env.production.local
```

Add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickhire
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

### Step 5: Build Application

```bash
npm run build
```

### Step 6: Install PM2

```bash
npm install -g pm2
```

### Step 7: Start Application with PM2

```bash
pm2 start npm --name "quickhire" -- start
pm2 startup
pm2 save
```

### Step 8: Set Up Nginx Reverse Proxy (Optional)

```bash
sudo apt update
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

## 🔍 Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] MongoDB connection string is valid
- [ ] NEXT_PUBLIC_API_URL matches your domain
- [ ] All API endpoints are working
- [ ] Job listings display correctly
- [ ] Admin panel is accessible
- [ ] Can create new job posts
- [ ] Can submit job applications
- [ ] Search and filter work properly
- [ ] Application is responsive on mobile

## 🐛 Troubleshooting Deployments

### "Cannot find module" Errors

- Run: `npm install`
- Clear cache: `rm -rf node_modules/.bin`
- Rebuild: `npm run build`

### MongoDB Connection Errors

- Verify connection string in environment variables
- Check IP whitelist on MongoDB Atlas
- Ensure username/password are URL-encoded

### Blank Pages

- Check browser console for errors
- Verify NEXT_PUBLIC_API_URL is correct
- Check server logs for API errors

### Slow Performance

- Optimize MongoDB indexes
- Enable compression in Nginx/server config
- Consider upgrading MongoDB tier from free M0

### Build Failures

- Check Node.js version (16+ required)
- Run locally first: `npm run build && npm start`
- Check for missing dependencies

## 📊 Monitoring

### Vercel

- Uses built-in analytics
- Check "Analytics" tab for performance metrics

### Railway/Render

- Built-in deployment logs
- Monitor resource usage
- Set up alerts for errors

### Self-Hosted

- Use PM2 monitoring: `pm2 monit`
- Set up log aggregation
- Use Nginx access logs: `tail -f /var/log/nginx/access.log`

## 🔐 Security Recommendations

1. **Use HTTPS**: All platforms above provide free SSL
2. **Database**: Use strong passwords, enable connection encryption
3. **Rate Limiting**: Implement on production API
4. **CORS**: Configure properly for your domain
5. **Environment Variables**: Never commit .env files
6. **Updates**: Keep Node.js and dependencies updated

---

Need help? Check deployment platform documentation or create an issue on GitHub.
