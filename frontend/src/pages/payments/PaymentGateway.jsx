import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import api from '../../lib/axios';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';

export default function PaymentGateway() {
  const location = useLocation();
  const navigate = useNavigate();
  const loan = location.state?.loan;

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('Credit Card');
  
  if (!loan) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-slate-400">
          No loan selected for payment. <button onClick={() => navigate('/my-loans')} className="text-accent underline">Go back to My Loans</button>
        </div>
      </MainLayout>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate network delay for payment gateway
      await new Promise(resolve => setTimeout(resolve, 1500));

      await api.post('/payments', {
        loanId: loan._id,
        amount: loan.emiAmount,
        paymentMethod: method
      });

      alert('Payment Successful!');
      navigate('/payments');
    } catch (error) {
      alert(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <ShieldCheck className="text-emerald-400 mr-3" size={32} />
          Secure Payment Gateway
        </h1>

        <div className="glass-card p-6 border-t-4 border-t-emerald-500">
          <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-700/50">
            <div>
              <p className="text-slate-400 text-sm">Paying EMI for</p>
              <p className="text-lg font-bold text-white">{loan.type}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Amount Due</p>
              <p className="text-3xl font-bold text-emerald-400">₹{loan.emiAmount.toFixed(2)}</p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`p-3 rounded-lg border flex items-center justify-center space-x-2 transition-all ${
                      method === m 
                        ? 'border-accent bg-accent/10 text-accent' 
                        : 'border-slate-700 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <CreditCard size={18} />
                    <span>{m}</span>
                  </button>
                ))}
              </div>
            </div>

            {method.includes('Card') && (
              <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Card Number (Mock)</label>
                  <input type="text" required placeholder="XXXX XXXX XXXX XXXX" className="input-field font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Expiry</label>
                    <input type="text" required placeholder="MM/YY" className="input-field font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">CVV</label>
                    <input type="password" required placeholder="***" className="input-field font-mono" />
                  </div>
                </div>
              </div>
            )}

            {method === 'UPI' && (
              <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">UPI ID (Mock)</label>
                  <input type="text" required placeholder="yourname@upi" className="input-field" />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <CheckCircle size={22} />
                  <span>Pay ₹{loan.emiAmount.toFixed(2)} Securely</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              By clicking "Pay", you agree to the mock payment terms and conditions.
            </p>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
