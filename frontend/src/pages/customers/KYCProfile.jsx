import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MainLayout from '../../components/MainLayout';
import api from '../../lib/axios';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const kycSchema = z.object({
  phone: z.string().min(10, 'Valid phone required'),
  panNumber: z.string().length(10, 'PAN must be 10 characters').optional().or(z.literal('')),
  aadharNumber: z.string().length(12, 'Aadhar must be 12 digits').optional().or(z.literal('')),
  address: z.object({
    street: z.string().min(1, 'Street required'),
    city: z.string().min(1, 'City required'),
    state: z.string().min(1, 'State required'),
    zipCode: z.string().min(1, 'Zip required'),
  }),
  employmentStatus: z.enum(['Salaried', 'Self-Employed', 'Business', 'Unemployed']),
  monthlyIncome: z.coerce.number().min(0, 'Must be positive'),
});

export default function KYCProfile() {
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(kycSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/customers/me');
        setKycData(data);
        reset(data); // Populate form
      } catch (error) {
        // Not found is fine, means they haven't created it yet
        console.log('No existing KYC profile found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await api.post('/customers', data);
      alert('KYC Profile Updated!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating profile');
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadStatus(`Uploading ${type}...`);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);

    try {
      await api.post('/customers/upload-document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadStatus(`${type} uploaded successfully!`);
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (error) {
      setUploadStatus(error.response?.data?.message || `Error uploading ${type}`);
    }
  };

  if (loading) return <MainLayout>Loading...</MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6">KYC & Profile</h1>
        
        {uploadStatus && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg flex items-center">
            <CheckCircle className="mr-2" size={20} />
            {uploadStatus}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card p-6">
            <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Personal Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Phone</label>
                  <input {...register('phone')} className="input-field" placeholder="Phone Number" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">PAN Number</label>
                  <input {...register('panNumber')} className="input-field" placeholder="ABCDE1234F" />
                  {errors.panNumber && <p className="text-red-400 text-xs mt-1">{errors.panNumber.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Aadhar Number</label>
                  <input {...register('aadharNumber')} className="input-field" placeholder="123456789012" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Employment</label>
                  <select {...register('employmentStatus')} className="input-field">
                    <option value="Salaried">Salaried</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Business">Business</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-slate-400 mb-1">Street Address</label>
                  <input {...register('address.street')} className="input-field" placeholder="123 Main St" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">City</label>
                  <input {...register('address.city')} className="input-field" placeholder="City" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">State</label>
                  <input {...register('address.state')} className="input-field" placeholder="State" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Zip Code</label>
                  <input {...register('address.zipCode')} className="input-field" placeholder="Zip Code" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-slate-400 mb-1">Monthly Income (₹)</label>
                  <input type="number" {...register('monthlyIncome')} className="input-field" placeholder="50000" />
                </div>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="btn-primary mt-4">
                {isSubmitting ? 'Saving...' : 'Save Profile Details'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Documents</h2>
              <div className="space-y-4">
                <DocumentUpload label="PAN Card" type="PAN" onChange={handleFileUpload} />
                <DocumentUpload label="Aadhar Card" type="Aadhar" onChange={handleFileUpload} />
                <DocumentUpload label="Salary Slip" type="Salary Slip" onChange={handleFileUpload} />
              </div>
            </div>
            
            <div className="glass-card p-6 bg-amber-500/5 border-amber-500/20">
              <h3 className="font-bold text-amber-500 flex items-center mb-2">
                <AlertCircle className="mr-2" size={18} /> KYC Status
              </h3>
              <p className="text-sm text-slate-300">
                Your profile is currently <span className="font-bold text-white">{kycData?.kycStatus || 'Not Submitted'}</span>. 
                {(!kycData || kycData.kycStatus === 'Submitted' || kycData.kycStatus === 'Not Submitted') && ' Upload all required documents to proceed.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const DocumentUpload = ({ label, type, onChange }) => (
  <div>
    <p className="text-sm text-slate-400 mb-2">{label}</p>
    <label className="flex items-center justify-center w-full h-24 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer hover:border-accent hover:bg-slate-800/50 transition-all">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="w-6 h-6 text-slate-400 mb-2" />
        <p className="text-xs text-slate-400">Click to upload</p>
      </div>
      <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => onChange(e, type)} />
    </label>
  </div>
);
