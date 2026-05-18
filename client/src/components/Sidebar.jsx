import { BookOpen, Scroll, Users, Search, LogOut, Wand2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHouse } from '../context/HouseContext';

const NAV = [
  { icon: BookOpen, label: 'The Great Hall',  page: 'dashboard' },
  { icon: Scroll,   label: 'Spell Library',   page: 'resources' },
  { icon: Users,    label: 'Study Houses',    page: 'groups' },
  { icon: Search,   label: 'Accio Search',    page: 'search' },
];

export default function Sidebar({ current, onNavigate }) {
  const { user, logout } = useAuth();
  const { house, clearHouse, theme, HOUSES } = useHouse();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">⚡</div>
        <span>StudySync</span>
      </div>

      {/* House badge */}
      {house && (
        <div className="house-badge" onClick={clearHouse} title="Change house">
          <span style={{ fontSize: 16 }}>{HOUSES[house].animal}</span>
          <div>
            <div className="house-badge-name">{HOUSES[house].name}</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontStyle: 'italic' }}>click to change</div>
          </div>
        </div>
      )}

      <nav>
        {NAV.map(({ icon: Icon, label, page }) => (
          <button
            key={page}
            className={`nav-item ${current === page ? 'active' : ''}`}
            onClick={() => onNavigate(page)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div style={{ margin: '20px 12px', height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />

      <div style={{ padding: '0 12px', fontSize: 11, color: 'var(--text2)', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7 }}>
        "It is our choices that show<br />what we truly are."
      </div>

      <div className="sidebar-bottom">
        <div className="user-chip">
          <div className="avatar">{user?.name?.[0]?.toUpperCase()}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontFamily: 'Cinzel, serif', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text)' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontStyle: 'italic' }}>{user?.email}</div>
          </div>
        </div>
        <button className="nav-item" onClick={logout} style={{ color: '#e07070' }}>
          <LogOut size={16} />
          Leave Hogwarts
        </button>
      </div>
    </aside>
  );
}
