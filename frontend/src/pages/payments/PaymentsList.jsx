import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import api from '../../lib/axios';
import { AuthContext } from '../../context/AuthContext';
import { Receipt, CreditCard } from 'lucide-react';

export default function PaymentsList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get('/payments');
        setPayments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Payment History</h1>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Loan Details</th>
                  <th className="px-6 py-4">Amount Paid</th>
                  <th className="px-6 py-4">Method / Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-8">Loading...</td></tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <Receipt size={48} className="mx-auto text-slate-600 mb-4" />
                      <p className="text-slate-400">No payments found.</p>
                      {user?.role === 'Customer' && (
                        <button onClick={() => navigate('/my-loans')} className="btn-primary mt-4">
                          Go to My Loans to Pay EMI
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment._id} className="border-b border-slate-700/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        {payment.transactionId}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{payment.customer?.user?.name}</div>
                        <div className="text-xs text-slate-500">{payment.customer?.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-accent">{payment.loan?.type}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-400">
                        ₹{payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1 text-slate-300">
                          <CreditCard size={14} />
                          <span>{payment.paymentMethod}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          {payment.status}
                        </span>
                      </td>
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
