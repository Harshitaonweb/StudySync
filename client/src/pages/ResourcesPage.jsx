import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { getResources, deleteResource, searchResources } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ResourceCard from '../components/ResourceCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ResourceModal from '../components/ResourceModal';

export default function ResourcesPage() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [filters, setFilters] = useState({ q: '', type: [], difficulty: [] });

  const load = async () => {
    setLoading(true);
    try {
      const hasFilter = filters.q || filters.type?.length || filters.difficulty?.length;
      const { data } = hasFilter
        ? await searchResources({ q: filters.q, type: filters.type, difficulty: filters.difficulty })
        : await getResources();
      setResources(data);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [JSON.stringify(filters)]);

  const handleDelete = async (resource) => {
    if (!confirm(`Delete "${resource.title}"?`)) return;
    try { await deleteResource(resource.id); load(); } catch {}
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Resources</div>
          <div className="page-subtitle">{resources.length} resources found</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')}>+ Add Resource</button>
      </div>

      <div className="search-bar">
        <SearchBar value={filters.q} onChange={(q) => setFilters((f) => ({ ...f, q }))} />
      </div>

      <FilterPanel filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="loading-center"><span className="spinner" /></div>
      ) : resources.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={40} />
          <h3>No resources found</h3>
          <p>Try adjusting your filters or add a new resource</p>
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
