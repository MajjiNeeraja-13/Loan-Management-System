import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Calendar, FileCheck, AlertCircle } from 'lucide-react';
import api from '../../lib/axios';
import { AuthContext } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer profile
        try {
          const customerRes = await api.get('/customers/me');
          setCustomer(customerRes.data);
        } catch (err) {
          console.log('Customer profile not found, KYC not started');
        }

        // Fetch loans independently
        try {
          const loansRes = await api.get('/loans');
          setLoans(loansRes.data);
        } catch (err) {
          console.error('Failed to fetch loans');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const totalOutstanding = loans
    .filter(l => l.status === 'Active')
    .reduce((sum, l) => sum + l.principalAmount, 0);

  const activeLoansCount = loans.filter(l => l.status === 'Active').length;
  const isKycIncomplete = !customer || customer.kycStatus !== 'Verified';

  return (
    <div className="space-y-6">
      {isKycIncomplete && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-4">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-500">
              {customer?.kycStatus === 'Submitted' ? 'KYC Pending Verification' : 'KYC Incomplete'}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {customer?.kycStatus === 'Submitted' 
                ? 'Your KYC profile is currently being verified by a Loan Manager.' 
                : 'Please complete your KYC profile to apply for a loan. We need your PAN and Aadhar details.'}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<IndianRupee />} title="Total Outstanding" value={`₹${totalOutstanding.toLocaleString()}`} color="text-blue-400" bg="bg-blue-400/10" />
        <StatCard icon={<Calendar />} title="Next EMI Due" value={activeLoansCount > 0 ? "1st of Next Month" : "-"} color="text-accent" bg="bg-accent/10" />
        <StatCard icon={<FileCheck />} title="Active Loans" value={activeLoansCount} color="text-emerald-400" bg="bg-emerald-400/10" />
      </div>

      <div className="glass-card p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">My Loans</h2>
        {loans.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <FileCheck size={48} className="mx-auto mb-4 opacity-20" />
            <p>You don't have any active loans yet.</p>
            <button onClick={() => navigate('/apply-loan')} className="btn-primary mt-4 inline-block">Apply for a Loan</button>
          </div>
        ) : (
          <div className="space-y-4">
            {loans.map(loan => (
              <div key={loan._id} className="flex justify-between items-center p-4 border border-slate-700/50 rounded-lg">
                <div>
                  <p className="font-bold">{loan.type}</p>
                  <p className="text-sm text-slate-400">₹{loan.principalAmount.toLocaleString()} • {loan.tenureMonths} Months</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${loan.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {loan.status}
                  </p>
                  <button onClick={() => navigate('/my-loans')} className="text-sm text-accent underline mt-1">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value, color, bg }) => (
  <div className="glass-card p-6">
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  </div>
);
