import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, businessName }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }
      setAuth(data);
      navigate('/dashboard');
    } catch (error) {
      setError('Unable to connect to server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-panel rounded-3xl border border-slate-200 p-8 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Create your ScopeGuard account</h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
          <label className="block text-sm font-medium text-slate-700">Business name</label>
          <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} type="text" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
          {error && <div className="rounded-2xl border border-danger/20 bg-danger/10 p-3 text-sm text-danger">{error}</div>}
          <button type="submit" className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent">Create account</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-primary">Sign in</Link></p>
      </div>
    </div>
  );
}
