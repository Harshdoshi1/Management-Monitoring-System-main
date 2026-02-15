# Department Monitoring System

A comprehensive management and monitoring system for NBA accreditation, student records, and faculty data. This is a **static frontend application** designed for deployment on Vercel.

## Features

- **Student Management**: Add, search, filter, and manage student records
- **Faculty Management**: Track faculty information, qualifications, and departments
- **NBA Criteria Tracking**: Complete support for all 10 NBA accreditation criteria
- **Automatic Calculations**: Real-time calculations for ratios, percentages, and metrics
- **Data Persistence**: Uses localStorage for data storage (no backend required)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
Management-Monitoring-System-main/
├── public/                    # Static files (deployed to Vercel)
│   ├── index.html            # Landing page
│   ├── login.html            # Login page
│   ├── signup.html           # Registration page
│   ├── dashboard.html        # Main dashboard
│   ├── nba.html              # NBA criteria page
│   ├── css/
│   │   └── styles.css        # Custom styles
│   └── js/
│       ├── storage.js        # Data storage module
│       ├── dashboard.js      # Dashboard functionality
│       └── nba.js            # NBA criteria handlers
├── vercel.json               # Vercel configuration
├── index.html                # Redirect to public folder
└── README.md                 # This file
```

## Demo Credentials

- **Email**: demo@example.com
- **Password**: demo123

## Deployment on Vercel

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push this project to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Find and select your repository from the list
5. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty
   - **Output Directory**: `public`
6. Click **"Deploy"**

### Step 3: Access Your Site

Once deployed, Vercel will provide you with a URL like:

- `https://your-project-name.vercel.app`

Your site is now live!

## How It Works

### Data Storage

This application uses **localStorage** for data persistence. This means:

- Data is stored in the user's browser
- Data persists across page refreshes
- Data is specific to each browser/device
- No server or database required

### NBA Criteria

The system supports all 10 NBA accreditation criteria:

1. **Criterion 1**: Vision, Mission & PEOs
2. **Criterion 2**: Program Curriculum
3. **Criterion 3**: Course Outcomes & PO Attainment
4. **Criterion 4**: Students' Performance (Enrollment, Success Rate, Placement)
5. **Criterion 5**: Faculty Information (S:F Ratio, Qualifications)
6. **Criterion 6**: Facilities & Technical Support
7. **Criterion 7**: Continuous Improvement
8. **Criterion 8**: First Year Academics
9. **Criterion 9**: Student Support Systems
10. **Criterion 10**: Governance & Financial Resources

### Automatic Calculations

The system automatically calculates:

- Enrollment Ratio
- Success Rate (with/without backlog)
- Mean CGPA
- Placement Rate
- Student-Faculty Ratio
- Faculty Cadre Ratio
- Faculty Qualification Index
- CO-PO Attainment Gap
- And more...

## Local Development

To run locally, simply open `public/index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000 --directory public

# Using Node.js (npx)
npx serve public

# Using PHP
php -S localhost:8000 -t public
```

Then open `http://localhost:8000` in your browser.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- The original PHP backend files are preserved in `backend/` and `frontend/` folders for reference
- This static version does not require any server-side processing
- All data is stored locally in the browser
- For production use with multiple users, consider implementing a proper backend with database

## License

This project is for educational purposes.
