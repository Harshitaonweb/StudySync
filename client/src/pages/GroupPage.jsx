import { useState, useEffect } from 'react';
import { Users, Plus, X, BookOpen, Search } from 'lucide-react';
import { getGroups, createGroup, joinGroup, getGroupResources, addResourceToGroup, getResources } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ResourceCard from '../components/ResourceCard';

function AddResourceModal({ groupId, onClose, onAdded }) {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getResources({ limit: 100 })
      .then(({ data }) => setResources(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (resourceId) => {
    setAdding(resourceId);
    setError('');
    try {
      await addResourceToGroup(groupId, resourceId);
      onAdded();
      onClose();
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to add resource');
      setAdding(null);
    }
  };

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">✦ Add Scroll to House</h2>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input
            className="input"
            style={{ paddingLeft: 36 }}
            placeholder="Search scrolls..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {loading ? (
          <div className="loading-center"><span className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{ padding: 30 }}>
            <BookOpen size={30} />
            <h3>No scrolls found</h3>
            <p>Add some resources first from the Spell Library</p>
          </div>
        ) : (
          <div style={{ maxHeight: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(r => (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                gap: 12,
              }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
                    {r.type} · {r.difficulty}
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: 12, flexShrink: 0 }}
                  onClick={() => handleAdd(r.id)}
                  disabled={adding === r.id}
                >
                  {adding === r.id ? <span className="spinner" style={{ width: 14, height: 14 }} /> : '+ Add'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GroupPage() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [groupResources, setGroupResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);
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
              <div className="page-subtitle">{groupResources.length} scrolls in this house</div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddResource(true)}>
            <Plus size={15} /> Add Scroll
          </button>
        </div>

        {groupResources.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={40} />
            <h3>No scrolls in this house yet</h3>
            <p>Click "Add Scroll" to share resources with your housemates</p>
            <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setShowAddResource(true)}>
              <Plus size={15} /> Add First Scroll
            </button>
          </div>
        ) : (
          <div className="resource-grid">
            {groupResources.map((r) => <ResourceCard key={r.id} resource={r} isOwner={r.owner_id === user?.id} />)}
          </div>
        )}

        {showAddResource && (
          <AddResourceModal
            groupId={selected.id}
            onClose={() => setShowAddResource(false)}
            onAdded={() => loadGroupResources(selected.id)}
          />
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
            <div style={{ fontSize: 14, fontFamily: 'Cinzel, serif', fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>Found a New House</div>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8 }}>
              <input className="input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="House name" required />
              <button type="submit" className="btn btn-primary">Create</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
            </form>
          </div>
        )}
        <div className="card">
          <div style={{ fontSize: 14, fontFamily: 'Cinzel, serif', fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>Join a House by ID</div>
          <form onSubmit={handleJoin} style={{ display: 'flex', gap: 8 }}>
            <input className="input" value={joinId} onChange={(e) => setJoinId(e.target.value)} placeholder="Paste house ID" required />
            <button type="submit" className="btn btn-primary">Join</button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="loading-center"><span className="spinner" /></div>
      ) : groups.length === 0 ? (
        <div className="empty-state">
          <Users size={40} />
          <h3>No houses yet</h3>
          <p>Create or join a house to collaborate</p>
        </div>
      ) : (
        <div className="groups-grid">
          {groups.map((g) => (
            <div key={g.id} className="group-card" onClick={() => setSelected(g)}>
              <div className="group-icon"><Users size={20} /></div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>{g.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', wordBreak: 'break-all' }}>ID: {g.id}</div>
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
