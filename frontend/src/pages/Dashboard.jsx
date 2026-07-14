import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import CustomerDashboard from './dashboards/CustomerDashboard';
import MainLayout from '../components/MainLayout';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const renderDashboard = () => {
    switch (user?.role) {
      case 'Super Admin':
      case 'Loan Manager':
        return <AdminDashboard />;
      case 'Loan Officer':
        // For now, officers see a similar view to admin but limited in scope
        return <AdminDashboard isOfficer={true} />;
      case 'Customer':
        return <CustomerDashboard />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  return (
    <MainLayout>
      <div className="animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name} 👋</h1>
        {renderDashboard()}
      </div>
    </MainLayout>
  );
}
