import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CreditCard, Activity, CheckCircle2, Globe, Smartphone, Lock, Zap, Landmark } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-primary text-white font-sans overflow-x-hidden">
      {/* 1. Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b-2 border-accent/40 bg-slate-900/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Landmark size={22} fill="currentColor" />
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">Smart<span className="text-purple-400">Loan</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-lg font-medium text-slate-300">
            <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About Us</a>
            <a href="#security" className="hover:text-purple-400 transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-lg font-bold hover:text-purple-400 transition-colors">Sign In</Link>
            <Link to="/register" className="btn-primary text-lg px-8 py-2.5 rounded-full shadow-lg">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[90vh]">
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-6"
          >
            E-Wallet & Digital Loans
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            The Future of <br/><span className="text-accent">Digital Payments!</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Apply for loans, track your EMIs, and transfer money effortlessly and securely. Experience the magic of smart banking.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <Link to="/register" className="btn-primary px-8 py-3.5 text-base flex items-center gap-2">
              Get Started Now <ArrowRight size={18} />
            </Link>
            <div className="flex items-center gap-4 text-sm text-slate-400 mt-4 sm:mt-0 ml-0 sm:ml-4">
              <div className="flex -space-x-3">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User avatar" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User avatar" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
              </div>
              <div>
                <div className="font-bold text-white flex items-center">
                  4.8 <span className="text-accent ml-1">★★★★★</span>
                </div>
                <div>from 10k+ users</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Mockup Art (CSS) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full h-[500px] flex items-center justify-center mt-12 lg:mt-0 hidden md:flex"
        >
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] -z-10"></div>
          
          {/* Fake Phone 1 (Back) */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute left-[10%] top-[10%] w-[240px] h-[500px] rounded-[3rem] border-[8px] border-slate-800 bg-slate-900 shadow-2xl overflow-hidden -rotate-6 z-0"
          >
            <div className="p-5 flex flex-col h-full opacity-60">
              <div className="w-full h-8 bg-slate-800 rounded-lg mb-4"></div>
              <div className="w-full h-24 bg-slate-800 rounded-xl mb-4"></div>
              <div className="space-y-3">
                <div className="w-full h-12 bg-slate-800 rounded-lg"></div>
                <div className="w-full h-12 bg-slate-800 rounded-lg"></div>
                <div className="w-full h-12 bg-slate-800 rounded-lg"></div>
              </div>
            </div>
          </motion.div>

          {/* Fake Phone 2 (Front) */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute right-[10%] top-[5%] w-[260px] h-[540px] rounded-[3rem] border-[8px] border-slate-800 bg-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden rotate-3 z-10"
          >
            <div className="absolute top-0 w-full h-6 flex justify-center mt-2 z-20">
              <div className="w-1/3 h-4 bg-slate-800 rounded-full"></div>
            </div>
            <div className="p-6 pt-12 flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
              <h3 className="text-sm font-bold text-slate-400 mb-1">Total Balance</h3>
              <p className="text-3xl font-bold text-white mb-8">₹ 8,45,000</p>
              
              <div className="w-full bg-accent/20 rounded-2xl p-4 border border-accent/20 mb-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-accent">Active Loan</span>
                  <span className="text-xs text-slate-400">Personal</span>
                </div>
                <p className="font-bold text-lg">₹ 12,000 / mo</p>
              </div>
              
              <div className="space-y-3 mt-auto">
                <div className="glass-card p-3 flex items-center justify-between border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><ArrowRight size={14} /></div>
                    <span className="text-sm font-medium">EMI Paid</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">-₹12,000</span>
                </div>
                <div className="glass-card p-3 flex items-center justify-between border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"><Activity size={14} /></div>
                    <span className="text-sm font-medium">Salary</span>
                  </div>
                  <span className="text-sm font-bold text-blue-400">+₹85,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Partners */}
      <section className="py-10 border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted by Global Financial Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Fake Logos */}
            <div className="flex items-center gap-2 font-bold text-xl"><Globe size={28}/> <span>GlobalBank</span></div>
            <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck size={28}/> <span>SecurePay</span></div>
            <div className="flex items-center gap-2 font-bold text-xl"><Activity size={28}/> <span>FinData</span></div>
            <div className="flex items-center gap-2 font-bold text-xl"><CreditCard size={28}/> <span>CardX</span></div>
          </div>
        </div>
      </section>

      {/* 4. About Us Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">About SmartLoan</h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              Founded in 2026, SmartLoan was built with a single mission: to democratize access to financial services. We believe that applying for a loan should not involve mountains of paperwork, hidden fees, and days of waiting.
            </p>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              Our innovative digital-first approach combines cutting-edge technology with deep financial expertise to offer instant approvals, transparent tracking, and flexible repayment options for everyone.
            </p>
            <div className="flex gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="font-bold text-2xl text-accent mb-1">100+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Team Members</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="font-bold text-2xl text-accent mb-1">4</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Global Offices</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-2xl -z-10"></div>
            <img src="/about_us.png" alt="Smart Loan Dashboard" className="rounded-3xl border border-slate-700 shadow-2xl w-full object-cover" />
          </div>
        </div>
      </section>

      {/* 5. Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Building the Future of Digital Payments</h2>
          <p className="text-slate-400 text-lg">Our smart platform eliminates the hassle of traditional banking. Fast approvals, transparent fees, and automated repayments—all in one place.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Analytics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Track your spending, loan balance, and EMIs in real-time with our advanced dashboards.</p>
          </div>
          
          <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mb-6">
              <CreditCard size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Gateways</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Pay your EMIs instantly using our unified secure payment gateway integration.</p>
          </div>

          <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fast KYC</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Get verified in minutes. Our digital KYC process ensures zero paperwork and maximum security.</p>
          </div>

          <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Your data is encrypted end-to-end. We adhere to the highest financial security standards.</p>
          </div>
        </div>
      </section>

      {/* 6. Security Section */}
      <section id="security" className="py-24 px-6 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 relative z-10">
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
              Bank-Grade Security
            </div>
            <h2 className="text-4xl font-bold mb-6">Your data is locked down.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We understand that financial data is sensitive. That's why we employ AES-256 military-grade encryption for all stored data and TLS 1.3 for all data in transit. 
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-medium text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-purple-400"><Lock size={16} /></div>
                End-to-End Encryption
              </li>
              <li className="flex items-center gap-3 font-medium text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-purple-400"><ShieldCheck size={16} /></div>
                Strict Data Privacy Policies
              </li>
              <li className="flex items-center gap-3 font-medium text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-purple-400"><CheckCircle2 size={16} /></div>
                Continuous Fraud Monitoring
              </li>
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="glass-card p-8 border-purple-500/30 bg-slate-900/80 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative z-10">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-ping"></div>
                  <ShieldCheck size={40} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">100% Secure</h3>
              <p className="text-center text-slate-400 text-sm">Audited by top tier security firms annually.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stats / CTA Section */}
      <section className="py-24 px-6 bg-slate-800/50 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Join Millions of <br/>Satisfied Users!</h2>
            <p className="text-lg text-slate-400">Create an account today and experience the easiest way to manage your financial loans.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-medium text-slate-300"><CheckCircle2 className="text-accent" size={20}/> No Hidden Charges</li>
              <li className="flex items-center gap-3 font-medium text-slate-300"><CheckCircle2 className="text-accent" size={20}/> 24/7 Dedicated Support</li>
              <li className="flex items-center gap-3 font-medium text-slate-300"><CheckCircle2 className="text-accent" size={20}/> Instant Disbursements</li>
            </ul>
            <Link to="/register" className="btn-primary px-8 py-4 inline-block text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)]">Create Free Account</Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
             <div className="glass-card p-8 text-center bg-slate-900 border-slate-700 hover:border-accent transition-colors">
               <div className="text-4xl font-extrabold text-white mb-2">275+</div>
               <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Global Partners</div>
             </div>
             <div className="glass-card p-8 text-center bg-slate-900 border-slate-700 hover:border-accent transition-colors translate-y-8 mt-4 md:mt-0">
               <div className="text-4xl font-extrabold text-white mb-2">₹50Cr</div>
               <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Loans Disbursed</div>
             </div>
             <div className="glass-card p-8 text-center bg-slate-900 border-slate-700 hover:border-accent transition-colors">
               <div className="text-4xl font-extrabold text-white mb-2">99.9%</div>
               <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Uptime</div>
             </div>
             <div className="glass-card p-8 text-center bg-slate-900 border-slate-700 hover:border-accent transition-colors translate-y-8 mt-4 md:mt-0">
               <div className="text-4xl font-extrabold text-white mb-2">500k</div>
               <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Active Users</div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. Simple Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 bg-slate-900 text-slate-500 text-center text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-purple-500" />
            <span className="font-bold text-white">SmartLoan</span>
          </div>
          <p>© 2026 Smart Loan System. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
