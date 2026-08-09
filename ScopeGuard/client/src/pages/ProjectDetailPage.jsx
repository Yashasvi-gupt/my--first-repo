import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [project, setProject] = useState(null);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ type: 'HOURS', amount: '', description: '' });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetch(`http://localhost:4000/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setProject)
      .catch(console.error);
    fetch(`http://localhost:4000/projects/${id}/logs`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setLogs)
      .catch(console.error);
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/projects/${id}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Unable to log work' });
        return;
      }
      setMessage({ type: data.warning ? 'warning' : 'success', text: data.message });
      setLogs((existing) => [data.log, ...existing]);
      setForm({ type: 'HOURS', amount: '', description: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' });
    }
  };

  return (
    <div className="min-h-screen bg-surface p-5 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <button onClick={() => navigate('/dashboard')} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Back</button>
        <button onClick={() => navigate(`/projects/${id}/invoices`)} className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-accent">Generate invoice</button>
      </div>
      {project ? (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{project.clientName}</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">{project.title}</h1>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${project.status === 'SCOPE_CREEP' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {project.status === 'SCOPE_CREEP' ? 'Scope creep' : 'On track'}
              </span>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-600">Rate</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">${project.rateAmount.toFixed(2)} {project.rateType.toLowerCase()}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-600">Scope summary</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Hours: {project.scopedHours ?? '—'}</li>
                  <li>Deliverables: {project.scopedDeliverables ?? '—'}</li>
                  <li>Revisions: {project.revisionLimit ?? '—'}</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">Work log</h2>
              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-3">
                  <select value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
                    <option value="HOURS">Hours</option>
                    <option value="DELIVERABLE">Deliverable</option>
                    <option value="REVISION">Revision</option>
                  </select>
                  <input value={form.amount} onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))} type="number" step="0.1" placeholder="Amount" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
                  <input value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} type="text" placeholder="Description" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
                </div>
                {message && <div className={`rounded-2xl p-3 text-sm ${message.type === 'error' ? 'bg-danger/10 text-danger' : message.type === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{message.text}</div>}
                <button type="submit" className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-accent">Log work</button>
              </form>
            </div>
          </section>
          <section className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Recent logs</h2>
            <div className="mt-5 space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="rounded-3xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{log.type}</p>
                    {log.isExtraWork && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Extra work</span>}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{log.description}</p>
                  <p className="mt-3 text-sm text-slate-500">Amount: {log.amount}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-6 shadow-soft">Loading project...</div>
      )}
    </div>
  );
}
