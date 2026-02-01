import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export interface Application {
  _id: string;
  job: any;
  jobSeeker: any;
  status: string;
  coverLetter: string;
  resume: string;
  appliedAt: string;
}

export const applicationService = {
  // Apply for a job
  applyForJob: async (jobId: string, coverLetter: string) => {
    const response = await axios.post(`${API_URL}/applications`, {
      jobId,
      coverLetter
    });
    return response.data;
  },

  // Get my applications (job seeker)
  getMyApplications: async () => {
    const response = await axios.get(`${API_URL}/applications/my-applications`);
    return response.data;
  },

  // Get applications for a job (employer)
  getJobApplications: async (jobId: string) => {
    const response = await axios.get(`${API_URL}/applications/job/${jobId}`);
    return response.data;
  },

  // Get all applications for employer
  getEmployerApplications: async () => {
    const response = await axios.get(`${API_URL}/applications/employer/all`);
    return response.data;
  },

  // Update application status (employer)
  updateApplicationStatus: async (id: string, status: string, notes?: string) => {
    const response = await axios.put(`${API_URL}/applications/${id}`, {
      status,
      notes
    });
    return response.data;
  },

  // Delete application (withdraw)
  deleteApplication: async (id: string) => {
    const response = await axios.delete(`${API_URL}/applications/${id}`);
    return response.data;
  }
};

export default applicationService;
