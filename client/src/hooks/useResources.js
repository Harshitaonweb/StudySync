import { useState, useEffect, useCallback } from 'react';
import { searchResources, getResources } from '../services/api';

export const useResources = (filters = {}) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const hasFilters = filters.q || filters.type || filters.difficulty || filters.tags;
      const { data } = hasFilters
        ? await searchResources(filters)
        : await getResources(filters);
      setResources(data);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetch(); }, [fetch]);

  return { resources, loading, error, refetch: fetch };
};
