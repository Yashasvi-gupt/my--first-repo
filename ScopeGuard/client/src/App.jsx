import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NewProjectPage from './pages/NewProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import InvoicePage from './pages/InvoicePage';
import SettingsPage from './pages/SettingsPage';
import useAuth from './hooks/useAuth.jsx';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" replace />} />
        <Route path="/projects/new" element={user ? <NewProjectPage /> : <Navigate to="/login" replace />} />
        <Route path="/projects/:id" element={user ? <ProjectDetailPage /> : <Navigate to="/login" replace />} />
        <Route path="/projects/:id/invoices" element={user ? <InvoicePage /> : <Navigate to="/login" replace />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" replace />} />
        <Route path="/*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </div>
  );
}

export default App;
