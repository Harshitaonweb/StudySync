import { Eye, Pencil, Trash2, ExternalLink } from 'lucide-react';

const typeClass = { PDF: 'badge-pdf', VIDEO: 'badge-video', NOTE: 'badge-note', CODE: 'badge-code' };
const diffClass = { BEGINNER: 'badge-beginner', INTERMEDIATE: 'badge-intermediate', ADVANCED: 'badge-advanced' };

export default function ResourceCard({ resource, onView, onEdit, onDelete, isOwner }) {
  return (
    <div className="resource-card" onClick={() => onView?.(resource)}>
      <div className="resource-card-top">
        <div className="resource-card-badges">
          <span className={`badge ${typeClass[resource.type]}`}>{resource.type}</span>
          <span className={`badge ${diffClass[resource.difficulty]}`}>{resource.difficulty}</span>
        </div>
        {!resource.is_public && (
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>🔒 Private</span>
        )}
      </div>

      <div>
        <div className="resource-card-title">{resource.title}</div>
        {resource.description && (
          <div className="resource-card-desc" style={{ marginTop: 6 }}>{resource.description}</div>
        )}
      </div>

      {resource.tags?.length > 0 && (
        <div className="resource-card-tags">
          {resource.tags.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          {resource.tags.length > 4 && (
            <span className="tag">+{resource.tags.length - 4}</span>
          )}
        </div>
      )}

      <div className="resource-card-footer" onClick={(e) => e.stopPropagation()}>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>
          {new Date(resource.created_at).toLocaleDateString()}
        </span>
        <div className="resource-card-actions">
          {resource.external_url && (
            <a href={resource.external_url} target="_blank" rel="noreferrer">
              <button className="icon-btn" title="Open link"><ExternalLink size={14} /></button>
            </a>
          )}
          {isOwner && (
            <>
              <button className="icon-btn" title="Edit" onClick={() => onEdit?.(resource)}><Pencil size={14} /></button>
              <button className="icon-btn danger" title="Delete" onClick={() => onDelete?.(resource)}><Trash2 size={14} /></button>
            </>
          )}
          {!isOwner && (
            <button className="icon-btn" title="View" onClick={() => onView?.(resource)}><Eye size={14} /></button>
          )}
        </div>
      </div>
    </div>
  );
}
