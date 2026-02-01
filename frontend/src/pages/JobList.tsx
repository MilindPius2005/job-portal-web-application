import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobService, { Job } from '../services/jobService';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experienceLevel: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const params = {
        search,
        ...filters
      };
      const response = await jobService.getJobs(params);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Jobs</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search jobs by title, description, or location..."
            className="input-field flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <select
          name="location"
          className="input-field"
          value={filters.location}
          onChange={handleFilterChange}
        >
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="London">London</option>
        </select>

        <select
          name="jobType"
          className="input-field"
          value={filters.jobType}
          onChange={handleFilterChange}
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <select
          name="experienceLevel"
          className="input-field"
          value={filters.experienceLevel}
          onChange={handleFilterChange}
        >
          <option value="">All Experience Levels</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
          <option value="Executive">Executive</option>
        </select>
      </div>

      <button onClick={fetchJobs} className="btn-secondary mb-8">
        Apply Filters
      </button>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link to={`/jobs/${job._id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                      {job.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mt-1">{job.companyName}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {job.jobType}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {job.experienceLevel}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-3 line-clamp-2">
                    {job.description}
                  </p>
                  {job.salary && job.salary.min && (
                    <p className="text-primary-600 font-semibold mt-2">
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
                    </p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-500">
                    {job.applicants} applicant{job.applicants !== 1 ? 's' : ''}
                  </p>
                  <Link to={`/jobs/${job._id}`} className="btn-primary mt-4 inline-block">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
