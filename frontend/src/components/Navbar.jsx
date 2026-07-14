import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, Bell } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="h-16 glass-card border-b border-slate-700/50 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center">
        <span className="text-xl font-bold text-accent">Smart Loan System</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-300 hover:text-accent transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center space-x-3 border-l border-slate-700 pl-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <User size={16} />
          </div>
          <button 
            onClick={logout}
            className="p-2 text-slate-300 hover:text-red-400 transition-colors ml-2"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
