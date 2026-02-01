# Job Portal - Full Stack Web Application

A full-stack job portal web application that connects job seekers with employers. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript.

## 📝 What I Built

This is a comprehensive job portal platform where:

- **Job Seekers** can browse job listings, search and filter opportunities, apply for jobs with cover letters, and track their application status
- **Employers** can post job listings with detailed requirements, manage their postings, review applications, and update candidate statuses
- **Both** enjoy a modern, responsive interface with secure authentication and user-friendly dashboards

### Key Features
- User registration and authentication (JWT-based)
- Role-based access control (Job Seeker / Employer)
- Job listing creation, editing, and management
- Advanced job search with filters (location, job type, experience level)
- Job application system with status tracking
- User profiles with skills, experience, and education
- Fully responsive design for mobile, tablet, and desktop

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React** (v18) - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** (v6) - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

## 🚀 How to Open/Run the Project

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
✅ Backend runs on: `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend runs on: `http://localhost:3000`

### Step 5: Access the Application

Open your browser and go to: **http://localhost:3000**

---

## 📂 Project Structure

```
job-portal/
├── backend/              # Node.js/Express backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
└── frontend/            # React/TypeScript frontend
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── context/     # Auth context
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   └── App.tsx      # Main app component
    └── public/          # Static files
```

---

## 📄 License

MIT
