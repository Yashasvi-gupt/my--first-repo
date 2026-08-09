import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login failed');
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
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Log in to track scope and bill work faster.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
          {error && <div className="rounded-2xl border border-danger/20 bg-danger/10 p-3 text-sm text-danger">{error}</div>}
          <button type="submit" className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent">Sign in</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">New here? <Link to="/register" className="font-semibold text-primary">Create an account</Link></p>
      </div>
    </div>
  );
}
