import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/customers/CustomerList';
import KYCProfile from './pages/customers/KYCProfile';
import LoanList from './pages/loans/LoanList';
import LoanApplicationForm from './pages/loans/LoanApplicationForm';
import PaymentsList from './pages/payments/PaymentsList';
import PaymentGateway from './pages/payments/PaymentGateway';
import Landing from './pages/Landing';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
          <Route path="/kyc" element={<ProtectedRoute><KYCProfile /></ProtectedRoute>} />
          
          <Route path="/loans" element={<ProtectedRoute><LoanList /></ProtectedRoute>} />
          <Route path="/my-loans" element={<ProtectedRoute><LoanList /></ProtectedRoute>} />
          <Route path="/apply-loan" element={<ProtectedRoute><LoanApplicationForm /></ProtectedRoute>} />
          
          <Route path="/payments" element={<ProtectedRoute><PaymentsList /></ProtectedRoute>} />
          <Route path="/pay-emi" element={<ProtectedRoute><PaymentGateway /></ProtectedRoute>} />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
