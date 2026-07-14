import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import api from '../../lib/axios';
import { AuthContext } from '../../context/AuthContext';
import { FileText, CheckCircle, XCircle, Clock, CreditCard } from 'lucide-react';

export default function LoanList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      const { data } = await api.get('/loans');
      setLoans(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/loans/${id}/status`, { status, remarks: `Status updated to ${status}` });
      alert(`Loan status successfully updated to ${status}!`);
      fetchLoans(); // Refresh
    } catch (error) {
      alert('Error updating status');
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      'Approved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Active': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'Rejected': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      'Closed': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${classes[status] || classes['Pending']}`}>
        {status}
      </span>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{user?.role === 'Customer' ? 'My Loans' : 'Loan Applications'}</h1>
          {user?.role === 'Customer' && (
            <Link to="/apply-loan" className="btn-primary">Apply for Loan</Link>
          )}
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Loan Details</th>
                  <th className="px-6 py-4">Amount / EMI</th>
                  <th className="px-6 py-4">Status</th>
                  {(user?.role === 'Super Admin' || user?.role === 'Loan Manager') && (
                    <th className="px-6 py-4 text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
                ) : loans.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <FileText size={48} className="mx-auto text-slate-600 mb-4" />
                      <p className="text-slate-400">No loans found.</p>
                    </td>
                  </tr>
                ) : (
                  loans.map((loan) => (
                    <tr key={loan._id} className="border-b border-slate-700/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{loan.customer?.user?.name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">{loan.customer?.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-accent">{loan.type}</div>
                        <div className="text-xs text-slate-400">{loan.tenureMonths} Months @ {loan.interestRate}% p.a.</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">₹{loan.principalAmount.toLocaleString()}</div>
                        <div className="text-xs text-emerald-400">EMI: ₹{loan.emiAmount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(loan.status)}
                      </td>
                      {(user?.role === 'Super Admin' || user?.role === 'Loan Manager') && (
                        <td className="px-6 py-4 text-right">
                          {loan.status === 'Pending' && (
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => handleStatusUpdate(loan._id, 'Approved')}
                                className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500/40"
                                title="Approve"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(loan._id, 'Rejected')}
                                className="p-1.5 bg-rose-500/20 text-rose-400 rounded hover:bg-rose-500/40"
                                title="Reject"
                              >
                                <XCircle size={18} />
                              </button>
                            </div>
                          )}
                          {loan.status === 'Approved' && (
                            <button 
                              onClick={() => handleStatusUpdate(loan._id, 'Active')}
                              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/40"
                            >
                              Disburse
                            </button>
                          )}
                        </td>
                      )}
                      
                      {user?.role === 'Customer' && (
                        <td className="px-6 py-4 text-right">
                          {loan.status === 'Active' && (
                            <button 
                              onClick={() => navigate('/pay-emi', { state: { loan } })}
                              className="px-3 py-1.5 bg-accent hover:bg-accent/80 text-black font-bold rounded-lg text-xs transition-colors flex items-center space-x-1 ml-auto"
                            >
                              <CreditCard size={14} />
                              <span>Pay EMI</span>
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
