import { LayoutDashboard, BookOpen, Users, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' },
  { icon: BookOpen,        label: 'Resources',  page: 'resources' },
  { icon: Users,           label: 'Groups',     page: 'groups' },
  { icon: Search,          label: 'Search',     page: 'search' },
];

export default function Sidebar({ current, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">📚</div>
        <span>StudySync</span>
      </div>

      <nav>
        {NAV.map(({ icon: Icon, label, page }) => (
          <button
            key={page}
            className={`nav-item ${current === page ? 'active' : ''}`}
            onClick={() => onNavigate(page)}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="user-chip">
          <div className="avatar">{user?.name?.[0]?.toUpperCase()}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
          </div>
        </div>
        <button className="nav-item" onClick={logout} style={{ color: 'var(--danger)' }}>
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
