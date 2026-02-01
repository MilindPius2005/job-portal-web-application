import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {user?.role === 'employer' ? 'Employer Dashboard' : 'My Applications'}
      </h1>
      <div className="card">
        <p className="text-gray-600">
          {user?.role === 'employer'
            ? 'Manage your job postings and view applications here.'
            : 'Track your job applications and their status here.'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
