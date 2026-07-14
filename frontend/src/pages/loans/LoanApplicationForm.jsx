import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import api from '../../lib/axios';
import { Calculator, AlertCircle, FileCheck } from 'lucide-react';

const loanSchema = z.object({
  type: z.enum(['Personal Loan', 'Home Loan', 'Auto Loan', 'Education Loan']),
  principalAmount: z.coerce.number().min(5000, 'Minimum loan amount is ₹5,000').max(10000000, 'Maximum is ₹1Cr'),
  tenureMonths: z.coerce.number().min(6, 'Minimum tenure is 6 months').max(360, 'Maximum is 30 years'),
});

const calculateEMI = (principal, annualRate, months) => {
  if (!principal || !annualRate || !months) return 0;
  const r = (annualRate / 12) / 100;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
};

export default function LoanApplicationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loanSchema),
    defaultValues: { type: 'Personal Loan', principalAmount: 50000, tenureMonths: 12 }
  });

  const type = watch('type');
  const principal = watch('principalAmount');
  const tenure = watch('tenureMonths');

  // Preview Interest Rate
  let interestRate = 10;
  if (type === 'Home Loan') interestRate = 8.5;
  if (type === 'Auto Loan') interestRate = 9.5;
  if (type === 'Personal Loan') interestRate = 12.5;
  if (type === 'Education Loan') interestRate = 7.5;

  const estimatedEMI = calculateEMI(Number(principal) || 0, interestRate, Number(tenure) || 0);

  const onSubmit = async (data) => {
    try {
      setError('');
      await api.post('/loans', data);
      alert('Loan Application Submitted successfully!');
      navigate('/my-loans');
    } catch (err) {
      setError(err.response?.data?.message || 'Error applying for loan');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Apply for a New Loan</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start space-x-3">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold">Application Failed</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Loan Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Loan Type</label>
                <select {...register('type')} className="input-field">
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="Auto Loan">Auto Loan</option>
                  <option value="Education Loan">Education Loan</option>
                </select>
                {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Principal Amount (₹)</label>
                <input 
                  type="number" 
                  {...register('principalAmount')} 
                  className="input-field" 
                  placeholder="50000"
                />
                {errors.principalAmount && <p className="text-red-400 text-xs mt-1">{errors.principalAmount.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Tenure (Months)</label>
                <input 
                  type="number" 
                  {...register('tenureMonths')} 
                  className="input-field" 
                  placeholder="12"
                />
                {errors.tenureMonths && <p className="text-red-400 text-xs mt-1">{errors.tenureMonths.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-4 flex items-center justify-center space-x-2">
                <FileCheck size={18} />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
              </button>
            </form>
          </div>

          <div>
            <div className="glass-card p-6 border-t-4 border-t-accent">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-accent/20 text-accent rounded-lg">
                  <Calculator size={24} />
                </div>
                <h2 className="text-xl font-bold">EMI Calculator Preview</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-400">Estimated Interest Rate</p>
                  <p className="text-2xl font-bold text-slate-200">{interestRate}% p.a.</p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Your Estimated Monthly EMI</p>
                  <p className="text-4xl font-bold text-emerald-400">
                    ₹{estimatedEMI ? estimatedEMI.toFixed(2) : '0.00'}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Total Amount Payable: ₹{estimatedEMI ? (estimatedEMI * tenure).toFixed(2) : '0.00'}
                  </p>
                </div>

                <div className="text-xs text-slate-500 bg-slate-800/30 p-3 rounded text-justify">
                  <strong>Note:</strong> This is a tentative EMI calculation based on standard rates. Final interest rate may vary based on your KYC, credit score, and verification process.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
