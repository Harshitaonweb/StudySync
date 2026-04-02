import { useState } from 'react';
import { X } from 'lucide-react';
import TagInput from './TagInput';
import { createResource, updateResource } from '../services/api';

const TYPES = ['PDF', 'VIDEO', 'NOTE', 'CODE'];
const DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export default function ResourceModal({ resource, onClose, onSaved }) {
  const isEdit = !!resource?.id;
  const [form, setForm] = useState({
    title: resource?.title || '',
    description: resource?.description || '',
    type: resource?.type || 'PDF',
    difficulty: resource?.difficulty || 'BEGINNER',
    external_url: resource?.external_url || '',
    is_public: resource?.is_public ?? true,
    tags: resource?.tags?.filter(Boolean) || [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...form, external_url: form.external_url || null };
      if (isEdit) await updateResource(resource.id, payload);
      else await createResource(payload);
      onSaved();
      onClose();
    } catch (e) {
      setError(e.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? '✦ Edit Scroll' : '✦ Add New Scroll'}</h2>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="input" value={form.title} onChange={(e) => set('title', e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="input" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} style={{ resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Type *</label>
              <select className="input" value={form.type} onChange={(e) => set('type', e.target.value)}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty *</label>
              <select className="input" value={form.difficulty} onChange={(e) => set('difficulty', e.target.value)}>
                {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">External URL</label>
            <input className="input" type="url" value={form.external_url} onChange={(e) => set('external_url', e.target.value)} placeholder="https://..." />
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <TagInput tags={form.tags} onChange={(tags) => set('tags', tags)} />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="is_public" checked={form.is_public} onChange={(e) => set('is_public', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
            <label htmlFor="is_public" className="form-label" style={{ margin: 0 }}>Make public</label>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : isEdit ? '✦ Save Changes' : '✦ Add to Library'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
