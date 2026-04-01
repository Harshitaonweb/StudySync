import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { debounce } from '../utils/debounce';

export default function SearchBar({ value, onChange, placeholder = 'Search resources...' }) {
  const debouncedChange = useRef(debounce(onChange, 300)).current;

  return (
    <div className="search-wrap">
      <Search size={16} />
      <input
        className="input"
        defaultValue={value}
        onChange={(e) => debouncedChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
