const TYPES = ['PDF', 'VIDEO', 'NOTE', 'CODE'];
const DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export default function FilterPanel({ filters, onChange }) {
  const toggle = (key, val) => {
    const current = filters[key] || [];
    const next = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="filter-row">
      <span style={{ fontSize: 13, color: 'var(--text3)', alignSelf: 'center' }}>Type:</span>
      {TYPES.map((t) => (
        <button
          key={t}
          className={`filter-chip ${filters.type?.includes(t) ? 'active' : ''}`}
          onClick={() => toggle('type', t)}
        >{t}</button>
      ))}
      <span style={{ fontSize: 13, color: 'var(--text3)', alignSelf: 'center', marginLeft: 8 }}>Level:</span>
      {DIFFICULTIES.map((d) => (
        <button
          key={d}
          className={`filter-chip ${filters.difficulty?.includes(d) ? 'active' : ''}`}
          onClick={() => toggle('difficulty', d)}
        >{d}</button>
      ))}
    </div>
  );
}
