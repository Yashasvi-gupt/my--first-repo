import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.jsx';

export default function SettingsPage() {
  const { token } = useAuth();
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:4000/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBusinessName(data.businessName || '');
        setEmail(data.email || '');
      })
      .catch(console.error);
  }, [token]);

  const handleSave = async () => {
    setMessage({ type: 'success', text: 'Settings saved locally' });
  };

  return (
    <div className="min-h-screen bg-surface p-5 md:p-8">
      <div className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <div className="mt-6 space-y-5">
          <label className="block text-sm font-medium text-slate-700">Business name</label>
          <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
          <button onClick={handleSave} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-accent">Save</button>
          {message && <div className="rounded-2xl bg-emerald-100 p-3 text-sm text-emerald-700">{message.text}</div>}
        </div>
      </div>
    </div>
  );
}
