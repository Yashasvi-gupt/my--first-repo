import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function DashboardPage() {
  const { token, clearAuth } = useAuth();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:4000/projects', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, [token]);

  return (
    <div className="min-h-screen bg-surface p-5 md:p-8">
      <header className="mb-8 flex flex-col gap-4 rounded-3xl bg-panel p-6 shadow-soft md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">ScopeGuard</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Freelancer scope tracker</h1>
          <p className="mt-2 text-slate-600">Quickly spot scope creep, log work, and generate invoices in one place.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/settings')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 hover:bg-slate-50">Settings</button>
          <button onClick={() => clearAuth()} className="rounded-2xl bg-danger px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Sign out</button>
        </div>
      </header>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Projects</h2>
        <button onClick={() => navigate('/projects/new')} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-accent">New project</button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => {
          const hoursLogged = project.summary.hoursLogged;
          const totalHours = project.scopedHours || 0;
          const percent = totalHours ? Math.min(100, (hoursLogged / totalHours) * 100) : 0;
          return (
            <div key={project.id} className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{project.clientName}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{project.title}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${project.status === 'SCOPE_CREEP' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {project.status === 'SCOPE_CREEP' ? 'Scope creep' : 'On track'}
                </span>
              </div>
              {project.scopedHours ? (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                    <span>Hours logged</span>
                    <span>{hoursLogged.toFixed(1)} / {totalHours.toFixed(1)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => navigate(`/projects/${project.id}`)} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">View</button>
                <button onClick={() => navigate(`/projects/${project.id}/invoices`)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Invoices</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
