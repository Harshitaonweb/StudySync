import { useState } from 'react';

export default function TagInput({ tags = [], onChange }) {
  const [input, setInput] = useState('');

  const add = (val) => {
    const trimmed = val.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const remove = (tag) => onChange(tags.filter((t) => t !== tag));

  const onKey = (e) => {
    if (['Enter', ',', ' '].includes(e.key)) {
      e.preventDefault();
      add(input);
    } else if (e.key === 'Backspace' && !input && tags.length) {
      remove(tags[tags.length - 1]);
    }
  };

  return (
    <div className="tag-input-wrap">
      {tags.map((t) => (
        <span key={t} className="tag">
          {t}
          <button className="tag-remove" onClick={() => remove(t)}>×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={() => input && add(input)}
        placeholder={tags.length === 0 ? 'Add tags (press Enter)' : ''}
      />
    </div>
  );
}
