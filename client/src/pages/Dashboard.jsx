import { useEffect, useState } from 'react';
import { BookOpen, Users, Tag, Globe } from 'lucide-react';
import { getResources, getGroups, getTags } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ResourceCard from '../components/ResourceCard';
import ResourceModal from '../components/ResourceModal';
import { deleteResource } from '../services/api';

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | resource obj

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
    if (!confirm(`Delete "${resource.title}"?`)) return;
    try { await deleteResource(resource.id); load(); } catch {}
  };

  const myResources = resources.filter((r) => r.owner_id === user?.id);

  const stats = [
    { icon: BookOpen, label: 'My Resources', value: myResources.length, color: '#7c6af7', bg: 'rgba(124,106,247,0.1)' },
    { icon: Globe,    label: 'Public',        value: resources.filter(r => r.is_public).length, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
    { icon: Users,    label: 'Groups',        value: groups.length, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
    { icon: Tag,      label: 'Tags',          value: tags.length, color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Welcome back, {user?.name?.split(' ')[0]} 👋</div>
          <div className="page-subtitle">Here's what's happening in your workspace</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')}>+ Add Resource</button>
      </div>

      <div className="stats-row">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="stat-card">
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={20} /></div>
            <div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Recent Resources</h2>
        <button className="btn btn-ghost" style={{ fontSize: 13, padding: '6px 14px' }} onClick={() => onNavigate('resources')}>View all →</button>
      </div>

      {loading ? (
        <div className="loading-center"><span className="spinner" /></div>
      ) : resources.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={40} />
          <h3>No resources yet</h3>
          <p>Add your first resource to get started</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setModal('add')}>+ Add Resource</button>
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
