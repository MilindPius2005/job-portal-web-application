import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  location: string;
  jobType: string;
  experienceLevel: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  applicationDeadline: string;
  companyName: string;
  status: string;
  applicants: number;
  createdAt: string;
}

export const jobService = {
  // Get all jobs with filters
  getJobs: async (params?: any) => {
    const response = await axios.get(`${API_URL}/jobs`, { params });
    return response.data;
  },

  // Get single job
  getJob: async (id: string) => {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  },

  // Create job (employer only)
  createJob: async (jobData: any) => {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  },

  // Update job (employer only)
  updateJob: async (id: string, jobData: any) => {
    const response = await axios.put(`${API_URL}/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job (employer only)
  deleteJob: async (id: string) => {
    const response = await axios.delete(`${API_URL}/jobs/${id}`);
    return response.data;
  },

  // Get employer's jobs
  getEmployerJobs: async () => {
    const response = await axios.get(`${API_URL}/jobs/employer/my-jobs`);
    return response.data;
  }
};

export default jobService;
