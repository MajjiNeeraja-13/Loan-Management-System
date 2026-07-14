import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, FileText, CreditCard, Settings, User } from 'lucide-react';

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  const getLinksForRole = () => {
    const role = user?.role;
    const baseLinks = [
      { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    ];

    if (role === 'Super Admin' || role === 'Loan Manager' || role === 'Loan Officer') {
      baseLinks.push({ path: '/customers', name: 'Customers', icon: <Users size={20} /> });
      baseLinks.push({ path: '/loans', name: 'Loans', icon: <FileText size={20} /> });
    }

    if (role === 'Super Admin' || role === 'Loan Manager') {
      baseLinks.push({ path: '/payments', name: 'Payments', icon: <CreditCard size={20} /> });
      baseLinks.push({ path: '/settings', name: 'Settings', icon: <Settings size={20} /> });
    }

    if (role === 'Customer') {
      baseLinks.push({ path: '/my-loans', name: 'My Loans', icon: <FileText size={20} /> });
      baseLinks.push({ path: '/kyc', name: 'KYC & Profile', icon: <User size={20} /> });
      baseLinks.push({ path: '/payments', name: 'Payments', icon: <CreditCard size={20} /> });
    }

    return baseLinks;
  };

  const links = getLinksForRole();

  return (
    <aside className="w-64 glass-card border-r border-slate-700/50 hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16">
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-accent/10 text-accent border border-accent/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
