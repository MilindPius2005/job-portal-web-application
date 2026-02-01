# Job Portal - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Security Considerations](#security-considerations)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd job-portal
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Configuration

### Backend Configuration

1. Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

2. Update the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_very_secure_jwt_secret_key_change_in_production
JWT_EXPIRE=30d
NODE_ENV=development
```

**Important Security Notes:**
- Change `JWT_SECRET` to a strong, random string in production
- Never commit `.env` files to version control
- Use different secrets for development and production

### Frontend Configuration

1. Create a `.env` file in the `frontend` directory:

```bash
cd frontend
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

For production, update this to your production API URL.

### Database Setup

1. Start MongoDB:

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

2. Verify MongoDB is running:

```bash
mongosh
```

## Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend in Production Mode

```bash
cd backend
NODE_ENV=production npm start
```

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Manual Testing Checklist

- [ ] User registration (both job seeker and employer)
- [ ] User login
- [ ] Create job listing (employer)
- [ ] View job listings
- [ ] Search and filter jobs
- [ ] Apply for job (job seeker)
- [ ] View applications (both roles)
- [ ] Update job status
- [ ] Update user profile
- [ ] Responsive design on mobile/tablet

## Deployment

### Option 1: Deploy to Heroku

#### Backend Deployment

```bash
cd backend

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name-backend

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Frontend Deployment

```bash
cd frontend

# Build the app
npm run build

# Deploy to Netlify, Vercel, or AWS S3
# Update REACT_APP_API_URL to production backend URL
```

### Option 2: Deploy to AWS

#### Backend (EC2 + MongoDB Atlas)

1. Set up MongoDB Atlas account
2. Create a cluster and get connection string
3. Launch EC2 instance
4. Install Node.js and Git
5. Clone repository and install dependencies
6. Set up PM2 for process management
7. Configure Nginx as reverse proxy

#### Frontend (S3 + CloudFront)

1. Build the application
2. Upload to S3 bucket
3. Configure bucket for static website hosting
4. Set up CloudFront distribution
5. Update CORS settings

### Option 3: Deploy to DigitalOcean

1. Create a Droplet
2. Install Node.js, MongoDB, and Nginx
3. Clone repository
4. Set up environment variables
5. Use PM2 to run Node.js application
6. Configure Nginx as reverse proxy
7. Set up SSL with Let's Encrypt

## Security Considerations

### Essential Security Measures

1. **Environment Variables**
   - Never commit `.env` files
   - Use different secrets for each environment
   - Rotate JWT secrets regularly

2. **Password Security**
   - Passwords are hashed using bcrypt
   - Minimum password length: 6 characters
   - Consider implementing password strength requirements

3. **Authentication**
   - JWT tokens expire after 30 days (configurable)
   - Implement refresh tokens for better security
   - Add rate limiting to prevent brute force attacks

4. **API Security**
   - CORS is configured but should be restricted in production
   - Implement rate limiting
   - Add request validation middleware
   - Use helmet.js for HTTP headers security

5. **Database Security**
   - Use MongoDB authentication
   - Implement proper indexing
   - Regular backups
   - Connection string should use SSL in production

6. **File Uploads** (if implementing resume uploads)
   - Validate file types
   - Limit file sizes
   - Scan for malware
   - Use cloud storage (AWS S3, Cloudinary)

### Recommended Additional Security Packages

```bash
# Backend
npm install helmet express-rate-limit express-mongo-sanitize xss-clean hpp

# Add to server.js:
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100
});
app.use('/api/', limiter);
```

## API Documentation

### Base URL
Development: `http://localhost:5000/api`

### Authentication Endpoints

#### Register User
```
POST /auth/register
Body: {
  name: string,
  email: string,
  password: string,
  role: 'jobseeker' | 'employer',
  phone?: string,
  location?: string,
  companyName?: string (required for employers)
}
Response: { success: boolean, token: string, user: object }
```

#### Login
```
POST /auth/login
Body: { email: string, password: string }
Response: { success: boolean, token: string, user: object }
```

### Jobs Endpoints

#### Get All Jobs
```
GET /jobs
Query Parameters:
  - search: string (text search)
  - location: string
  - jobType: string
  - experienceLevel: string
  - page: number
  - limit: number
Response: { success: boolean, data: Job[], count: number, pagination: object }
```

#### Create Job (Employer Only)
```
POST /jobs
Headers: Authorization: Bearer <token>
Body: {
  title: string,
  description: string,
  requirements: string[],
  location: string,
  jobType: string,
  experienceLevel: string,
  salary: { min: number, max: number },
  applicationDeadline: date
}
Response: { success: boolean, data: Job }
```

### Applications Endpoints

#### Apply for Job (Job Seeker Only)
```
POST /applications
Headers: Authorization: Bearer <token>
Body: {
  jobId: string,
  coverLetter: string
}
Response: { success: boolean, data: Application }
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env
   - Verify network connectivity

2. **CORS Errors**
   - Check frontend .env has correct API URL
   - Verify CORS configuration in backend

3. **Authentication Issues**
   - Check JWT_SECRET is set correctly
   - Verify token is being sent in headers
   - Check token expiration

4. **Port Already in Use**
   ```bash
   # Find process using port 5000
   lsof -i :5000
   # Kill the process
   kill -9 <PID>
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and commercial purposes.

## Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review API documentation above

## Future Enhancements

- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Resume parsing
- [ ] Chat system between employers and job seekers
- [ ] Video interview integration
- [ ] Analytics dashboard
- [ ] Social media integration
- [ ] Recommendation system
- [ ] Multi-language support
- [ ] Mobile app (React Native)
