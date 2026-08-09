import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function NewProjectPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    title: '',
    rateType: 'HOURLY',
    rateAmount: '',
    scopedHours: '',
    scopedDeliverables: '',
    revisionLimit: '',
    deadline: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Unable to create project');
        return;
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="min-h-screen bg-surface p-5 md:p-8">
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-soft border border-slate-200">
        <button onClick={() => navigate('/dashboard')} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">Back</button>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">New project</h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Client name</span>
              <input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Client email</span>
              <input type="email" value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Project title</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Rate type</span>
              <select value={form.rateType} onChange={(e) => setForm({ ...form, rateType: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
                <option value="HOURLY">Hourly</option>
                <option value="FIXED">Fixed</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Rate amount</span>
              <input type="number" value={form.rateAmount} onChange={(e) => setForm({ ...form, rateAmount: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Scoped hours</span>
              <input type="number" value={form.scopedHours} onChange={(e) => setForm({ ...form, scopedHours: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Deliverables</span>
              <input type="number" value={form.scopedDeliverables} onChange={(e) => setForm({ ...form, scopedDeliverables: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Revision limit</span>
              <input type="number" value={form.revisionLimit} onChange={(e) => setForm({ ...form, revisionLimit: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Deadline</span>
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
          </label>
          {error && <div className="rounded-2xl bg-danger/10 p-4 text-sm text-danger">{error}</div>}
          <button type="submit" className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-accent">Create project</button>
        </form>
      </div>
    </div>
  );
}
