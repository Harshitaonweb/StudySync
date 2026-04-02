import { useState, useEffect } from 'react';
import { Users, Plus, X, BookOpen } from 'lucide-react';
import { getGroups, createGroup, joinGroup, getGroupResources } from '../services/api';
import ResourceCard from '../components/ResourceCard';

export default function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [groupResources, setGroupResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [joinId, setJoinId] = useState('');
  const [error, setError] = useState('');

  const loadGroups = async () => {
    setLoading(true);
    try { const { data } = await getGroups(); setGroups(data); }
    catch {} finally { setLoading(false); }
  };

  const loadGroupResources = async (id) => {
    try { const { data } = await getGroupResources(id); setGroupResources(data); }
    catch {}
  };

  useEffect(() => { loadGroups(); }, []);

  useEffect(() => {
    if (selected) loadGroupResources(selected.id);
    else setGroupResources([]);
  }, [selected]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createGroup(newName);
      setNewName(''); setShowCreate(false);
      loadGroups();
    } catch (e) { setError(e.response?.data?.error || 'Failed to create group'); }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await joinGroup(joinId.trim());
      setJoinId('');
      loadGroups();
    } catch (e) { setError(e.response?.data?.error || 'Failed to join group'); }
  };

  if (selected) {
    return (
      <div>
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="icon-btn" onClick={() => setSelected(null)}><X size={16} /></button>
            <div>
              <div className="page-title">{selected.name}</div>
              <div className="page-subtitle">{groupResources.length} resources</div>
            </div>
          </div>
        </div>

        {groupResources.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={40} />
            <h3>No resources in this group</h3>
            <p>Add resources to this group from the Resources page</p>
          </div>
        ) : (
          <div className="resource-grid">
            {groupResources.map((r) => <ResourceCard key={r.id} resource={r} />)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Study Houses</div>
          <div className="page-subtitle">Collaborate with fellow wizards</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}><Plus size={16} /> Found a House</button>
      </div>

      {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        {showCreate && (
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Create Group</div>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8 }}>
              <input className="input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Group name" required />
              <button type="submit" className="btn btn-primary">Create</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
            </form>
          </div>
        )}
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Join Group by ID</div>
          <form onSubmit={handleJoin} style={{ display: 'flex', gap: 8 }}>
            <input className="input" value={joinId} onChange={(e) => setJoinId(e.target.value)} placeholder="Paste group ID" required />
            <button type="submit" className="btn btn-primary">Join</button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="loading-center"><span className="spinner" /></div>
      ) : groups.length === 0 ? (
        <div className="empty-state">
          <Users size={40} />
          <h3>No groups yet</h3>
          <p>Create or join a group to collaborate</p>
        </div>
      ) : (
        <div className="groups-grid">
          {groups.map((g) => (
            <div key={g.id} className="group-card" onClick={() => setSelected(g)}>
              <div className="group-icon"><Users size={20} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{g.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', wordBreak: 'break-all' }}>ID: {g.id}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8 }}>
                Created {new Date(g.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
