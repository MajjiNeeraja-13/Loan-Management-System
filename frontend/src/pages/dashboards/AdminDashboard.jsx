import React from 'react';
import { Users, FileText, IndianRupee, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 6890 },
  { name: 'Jun', value: 8390 },
];

export default function AdminDashboard({ isOfficer }) {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users />} title={isOfficer ? "My Customers" : "Total Customers"} value="1,234" color="text-blue-400" bg="bg-blue-400/10" border="border-blue-400/20" />
        <StatCard icon={<FileText />} title="Active Loans" value="856" color="text-accent" bg="bg-accent/10" border="border-accent/20" />
        <StatCard icon={<IndianRupee />} title="Total Disbursed" value="₹4.2M" color="text-emerald-400" bg="bg-emerald-400/10" border="border-emerald-400/20" />
        <StatCard icon={<Activity />} title="Pending Approvals" value="23" color="text-rose-400" bg="bg-rose-400/10" border="border-rose-400/20" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 glass-card p-6 h-96 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Disbursement Overview</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Area type="monotone" dataKey="value" stroke="#fbbf24" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <div>
                  <p className="text-slate-200">Loan #LN-{1000 + i} Approved</p>
                  <p className="text-slate-400 text-xs">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value, color, bg, border }) => (
  <div className={`glass-card p-6 border-l-4 ${border.replace('border-', 'border-l-')}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);
