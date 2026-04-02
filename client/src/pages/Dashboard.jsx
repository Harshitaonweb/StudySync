import { useEffect, useState } from 'react';
import { BookOpen, Users, Tag, Globe } from 'lucide-react';
import { getResources, getGroups, getTags, deleteResource } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ResourceCard from '../components/ResourceCard';
import ResourceModal from '../components/ResourceModal';

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [r, g, t] = await Promise.all([getResources({ limit: 6 }), getGroups(), getTags()]);
      setResources(r.data);
      setGroups(g.data);
      setTags(t.data);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (resource) => {
    if (!confirm(`Vanish "${resource.title}"?`)) return;
    try { await deleteResource(resource.id); load(); } catch {}
  };

  const myResources = resources.filter((r) => r.owner_id === user?.id);

  const stats = [
    { icon: BookOpen, label: 'My Scrolls',    value: myResources.length,                        color: '#c9a84c', bg: 'rgba(201,168,76,0.08)' },
    { icon: Globe,    label: 'Public Tomes',  value: resources.filter(r => r.is_public).length, color: '#6dbf8a', bg: 'rgba(26,74,46,0.15)' },
    { icon: Users,    label: 'Study Houses',  value: groups.length,                              color: '#e07070', bg: 'rgba(139,26,26,0.15)' },
    { icon: Tag,      label: 'Spell Tags',    value: tags.length,                                color: '#b39ddb', bg: 'rgba(124,77,255,0.1)' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Welcome, {user?.name?.split(' ')[0]} ⚡</div>
          <div className="page-subtitle">Your magical library awaits, young wizard</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')}>✦ Add Scroll</button>
      </div>

      <div className="stats-row">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="stat-card">
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={18} /></div>
            <div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 14, fontFamily: 'Cinzel, serif', color: 'var(--text2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          ✦ Recent Scrolls
        </h2>
        <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => onNavigate('resources')}>
          View all →
        </button>
      </div>

      {loading ? (
        <div className="loading-center">
          <span className="spinner" style={{ width: 28, height: 28 }} />
          <span>Summoning scrolls...</span>
        </div>
      ) : resources.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={40} />
          <h3>The library is empty</h3>
          <p>Begin your collection of magical knowledge</p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setModal('add')}>✦ Add First Scroll</button>
        </div>
      ) : (
        <div className="resource-grid">
          {resources.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              isOwner={r.owner_id === user?.id}
              onEdit={(res) => setModal(res)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modal && (
        <ResourceModal
          resource={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}
    </div>
  );
}
