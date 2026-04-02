import { useState } from 'react';
import { Search } from 'lucide-react';
import { searchResources } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ResourceCard from '../components/ResourceCard';
import FilterPanel from '../components/FilterPanel';
import TagInput from '../components/TagInput';

export default function SearchPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ type: [], difficulty: [] });
  const [tags, setTags] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const { data } = await searchResources({ q: query, type: filters.type, difficulty: filters.difficulty, tags });
      setResults(data);
      setSearched(true);
    } catch {}
    finally { setLoading(false); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Accio Search</div>
          <div className="page-subtitle">Summon any scroll from the library</div>
        </div>
      </div>

      <form onSubmit={search}>
        <div className="search-bar" style={{ marginBottom: 16 }}>
          <div className="search-wrap" style={{ flex: 1 }}>
            <Search size={16} />
            <input
              className="input"
              style={{ paddingLeft: 38 }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title..."
            />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </div>

        <FilterPanel filters={filters} onChange={setFilters} />

        <div className="form-group" style={{ marginBottom: 24 }}>
          <label className="form-label">Filter by tags</label>
          <TagInput tags={tags} onChange={setTags} />
        </div>
      </form>

      {loading && <div className="loading-center"><span className="spinner" /></div>}

      {!loading && searched && (
        <>
          <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </div>
          {results.length === 0 ? (
            <div className="empty-state">
              <Search size={40} />
              <h3>No results</h3>
              <p>Try different keywords or filters</p>
            </div>
          ) : (
            <div className="resource-grid">
              {results.map((r) => (
                <ResourceCard key={r.id} resource={r} isOwner={r.owner_id === user?.id} />
              ))}
            </div>
          )}
        </>
      )}

      {!searched && !loading && (
        <div className="empty-state">
          <Search size={40} />
          <h3>Cast your spell</h3>
          <p>Speak the incantation — "Accio [topic]"</p>
        </div>
      )}
    </div>
  );
}
