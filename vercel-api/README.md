
# CSUMB ILP Backend API

This backend API provides authentication and database functionality for the CSUMB ILP Portfolio application.

## Setup Instructions

### 1. Neon PostgreSQL Database Setup
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project/database
3. Copy your connection string (it will look like: `postgresql://username:password@host/database`)
4. Run the SQL commands from `schema.sql` in your Neon SQL editor to create the required tables

### 2. Vercel Deployment
1. Push this `vercel-api` folder to GitHub (either as part of your main repo or as a separate repo)
2. Go to [vercel.com](https://vercel.com) and import your project
3. Set the **Root Directory** to `vercel-api` if it's part of a larger repo
4. Add these environment variables in Vercel:
   - `NEON_DATABASE_URL`: Your Neon PostgreSQL connection string
   - `ADMIN_USERNAME`: Your admin username (e.g., "bug")
   - `ADMIN_PASSWORD`: A secure password for admin access
   - `SESSION_SECRET`: A random 64-byte base64 encoded string (generate with: `openssl rand -base64 64`)

### 3. Update Frontend Configuration
After deploying to Vercel, update the API_BASE_URL in these frontend files:
- `src/hooks/useAuth.tsx`
- `src/components/AssignmentManager.tsx`

Replace `'https://your-vercel-project.vercel.app'` with your actual Vercel deployment URL.

### 4. Security Notes
- Never commit your `.env` file to Git
- Use strong passwords for admin accounts
- The SESSION_SECRET should be a long, random string
- CORS is configured to only allow requests from your GitHub Pages domain

## API Endpoints

- `POST /api/login` - Admin authentication
- `GET /api/me` - Check current user session
- `POST /api/logout` - Logout admin user
- `GET /api/assignments/[courseCode]` - Get assignments for a course (public)
- `POST /api/assignments/[courseCode]` - Create assignment (admin only)
- `PUT /api/assignments/[courseCode]` - Update assignment (admin only)
- `DELETE /api/assignments/[courseCode]` - Delete assignment (admin only)
