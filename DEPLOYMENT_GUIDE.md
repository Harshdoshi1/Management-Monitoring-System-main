# VERCEL DEPLOYMENT GUIDE

Follow these exact steps to deploy the Department Monitoring System on Vercel.

## ✅ Prerequisites

- GitHub account (https://github.com)
- Vercel account (https://vercel.com) - sign up with GitHub

## 📋 Step 1: Initialize Git Repository

Open PowerShell in your project directory and run:

```powershell
cd "c:\Users\Harsh\Downloads\Management-Monitoring-System-main\Management-Monitoring-System-main"

git config --global user.email "your-email@gmail.com"
git config --global user.name "Your Name"

git init
git add .
git commit -m "Initial commit - Department Monitoring System"
git branch -M main
```

⚠️ **Do NOT push to GitHub yet** - we'll do that after setting up Vercel.

## 🔗 Step 2: Create Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `department-monitoring-system`
3. Select **Public** (for Vercel free tier)
4. Click **Create repository**

## 📤 Step 3: Push Code to GitHub

After creating the repository, you'll see instructions. Copy the remote URL and run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/department-monitoring-system.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 🚀 Step 4: Deploy on Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Click **"Sign Up"** and choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Click **"Add New..."** → **"Project"**
5. Find `department-monitoring-system` in the list and click **"Import"**
6. **Configure Project:**
   - Framework Preset: `Other`
   - Root Directory: `.` (default)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Environment Variables: (skip)
7. Click **"Deploy"**

### Option B: Using Vercel CLI

```powershell
# Install Vercel CLI globally (one time)
npm install -g vercel

# Navigate to your project
cd "c:\Users\Harsh\Downloads\Management-Monitoring-System-main\Management-Monitoring-System-main"

# Deploy
vercel --prod
```

Follow the prompts and link your GitHub account when asked.

## ✨ Step 5: Your Site is Live!

Once deployment completes, you'll get a URL like:

```
https://department-monitoring-system.vercel.app
```

Or a custom domain if you configured one.

## 🔍 Verify Deployment

1. Open the Vercel URL in your browser
2. You should see the Department Monitoring System landing page
3. Use demo credentials:
   - **Email**: demo@example.com
   - **Password**: demo123

## 🐛 Troubleshooting

### Getting 404 Error?

- ✅ Fixed! The new `vercel.json` now routes all traffic to `/public/index.html`
- Make sure you've pushed the latest code:
  ```powershell
  git add .
  git commit -m "Fixed vercel.json configuration"
  git push origin main
  ```
- Vercel will auto-redeploy (check https://vercel.com/dashboard)

### Getting Blank Page?

- Clear your browser cache (Ctrl+Shift+Delete)
- Try incognito/private window
- Check browser console for errors (F12)

### Data Not Persisting?

- This is normal - localStorage is per-browser
- Each browser/device has its own data
- Demo account has demo data on first load

### Still Having Issues?

Check Vercel deployment logs:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Deployments"
4. Click the failed deployment
5. Scroll to "Build Logs" to see errors

## 📱 Using Your Live Site

### Access Different Sections

**URL Structure:**

- Landing: `https://your-domain.vercel.app`
- Login: `https://your-domain.vercel.app/public/login.html`
- Dashboard: `https://your-domain.vercel.app/public/dashboard.html`

But you can access everything through the landing page and navigation.

### Create Sample Data

1. Click "Sign Up"
2. Create your account with any email/password
3. Login
4. Go to "Students" tab and add some students
5. Go to "Faculty" tab and add faculty
6. Go to "NBA Criteria" tab
7. Click on any criterion (e.g., "4.1 Enrollment Ratio")
8. Enter data and watch calculations happen automatically!

## 🔄 Making Updates

After making changes to your code:

```powershell
git add .
git commit -m "Describe your changes"
git push origin main
```

Vercel will automatically redeploy your changes within 1-2 minutes!

## 📊 Application Features

Once deployed, you have:

- ✅ Full student management
- ✅ Full faculty management
- ✅ All 10 NBA criteria with forms
- ✅ Automatic calculations (ratios, percentages, etc.)
- ✅ Data persistence (localStorage)
- ✅ Authentication system
- ✅ Responsive design (works on mobile too)

## 💡 Important Notes

1. **Data Storage**: Uses browser's localStorage - data is local to each browser
2. **No Database**: This is a static site, no server needed
3. **No Backend**: All processing happens in the browser
4. **Multiple Users**: Each user's browser stores their own data separately
5. **Export/Backup**: Manually copy localStorage data if needed

## 🎯 Next Steps (Optional)

### Custom Domain

1. Go to your Vercel project settings
2. Domains → Add your domain
3. Follow DNS instructions

### Password Protection

1. Go to project settings
2. Protection → Enable password
3. Set a password for the site

### Analytics

- Vercel provides basic analytics
- Check Vercel dashboard for traffic and performance

---

**Questions?** Check the README.md file for more information!
