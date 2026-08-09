import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function InvoicePage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetch(`http://localhost:4000/projects/${id}/invoices`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setInvoices)
      .catch(console.error);
  }, [id, token]);

  const handleGenerate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/projects/${id}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ dueDate }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Unable to generate invoice' });
        return;
      }
      setInvoices((prev) => [data, ...prev]);
      setMessage({ type: 'success', text: 'Invoice generated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' });
    }
  };

  return (
    <div className="min-h-screen bg-surface p-5 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <button onClick={() => navigate(-1)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Back</button>
        <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm text-slate-600">Generate invoice from unbilled work</p>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
          </div>
          <button onClick={handleGenerate} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-accent">Generate</button>
        </div>
        {message && <div className={`mt-4 rounded-2xl p-3 text-sm ${message.type === 'error' ? 'bg-danger/10 text-danger' : 'bg-emerald-100 text-emerald-700'}`}>{message.text}</div>}
      </div>
      <div className="mt-6 grid gap-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{invoice.invoiceNumber}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">${invoice.totalAmount.toFixed(2)}</p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{invoice.status}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`http://localhost:4000/invoices/${invoice.id}/pdf`} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Download PDF</a>
              <button onClick={() => navigate(`/projects/${id}`)} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">Project</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
