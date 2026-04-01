import { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResourcesPage from './pages/ResourcesPage';
import GroupPage from './pages/GroupPage';
import SearchPage from './pages/SearchPage';
import Sidebar from './components/Sidebar';

function AppInner() {
  const { user, loading } = useAuth();
  const [authPage, setAuthPage] = useState('login');
  const [page, setPage] = useState('dashboard');

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <span className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }

  if (!user) {
    return authPage === 'login'
      ? <Login onSwitch={() => setAuthPage('signup')} />
      : <Signup onSwitch={() => setAuthPage('login')} />;
  }

  const pages = {
    dashboard: <Dashboard onNavigate={setPage} />,
    resources: <ResourcesPage />,
    groups: <GroupPage />,
    search: <SearchPage />,
  };

  return (
    <div className="layout">
      <Sidebar current={page} onNavigate={setPage} />
      <main className="main">
        {pages[page] || pages.dashboard}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
