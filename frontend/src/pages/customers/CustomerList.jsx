import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import api from '../../lib/axios';
import { Search, Filter, MoreVertical, Eye } from 'lucide-react';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get(`/customers?search=${search}`);
        setCustomers(data.customers);
      } catch (error) {
        console.error('Failed to fetch customers', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce search
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Customers Directory</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search phone or PAN..." 
                className="input-field pl-10 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="glass-card px-4 py-2 flex items-center space-x-2 hover:bg-slate-700 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">PAN</th>
                  <th className="px-6 py-4 font-medium">KYC Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
                ) : customers.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-8">No customers found.</td></tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">
                        {c.user?.name}
                        <p className="text-xs text-slate-500 font-normal">{c.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">{c.phone}</td>
                      <td className="px-6 py-4 font-mono text-slate-400">{c.panNumber || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                          ${c.kycStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                            c.kycStatus === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                          {c.kycStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end space-x-2">
                        {c.kycStatus !== 'Verified' && (
                          <button 
                            onClick={async () => {
                              try {
                                await api.put(`/customers/${c._id}/kyc`, { status: 'Verified' });
                                alert('KYC Verified successfully!');
                                window.location.reload();
                              } catch (e) {
                                alert('Error verifying KYC');
                              }
                            }}
                            className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs hover:bg-emerald-500/40"
                          >
                            Verify
                          </button>
                        )}
                        <button className="text-slate-400 hover:text-accent transition-colors">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Simple Pagination Footer */}
          <div className="p-4 border-t border-slate-700 flex items-center justify-between text-sm text-slate-400">
            <span>Showing results</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Prev</button>
              <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Next</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
