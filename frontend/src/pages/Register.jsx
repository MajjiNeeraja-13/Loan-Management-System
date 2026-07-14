import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['Customer', 'Loan Officer', 'Loan Manager']),
});

export default function Register() {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'Customer' }
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      await registerUser(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-6 text-accent">
          <UserPlus size={48} />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Full Name</label>
            <input 
              type="text" 
              {...register('name')} 
              className="input-field" 
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Email Address</label>
            <input 
              type="email" 
              {...register('email')} 
              className="input-field" 
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input 
              type="password" 
              {...register('password')} 
              className="input-field" 
              placeholder="Create a strong password"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Role</label>
            <select {...register('role')} className="input-field">
              <option value="Customer">Customer</option>
              <option value="Loan Officer">Loan Officer</option>
              <option value="Loan Manager">Loan Manager</option>
            </select>
            {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary w-full mt-6"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400 text-sm">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
