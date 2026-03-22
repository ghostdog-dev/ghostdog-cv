import { useState, useEffect, useCallback, useRef } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(fetcher: () => Promise<T>) {
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    setState((prev) => ({ data: prev.data, loading: true, error: null }));
    fetcherRef.current()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState((prev) => ({
          data: prev.data,
          loading: false,
          error: err.message || "Erreur de chargement",
        })),
      );
  }, []);

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fetcherRef.current()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled)
          setState((prev) => ({
            data: prev.data,
            loading: false,
            error: err.message || "Erreur de chargement",
          }));
      });
    return () => { cancelled = true; };
  }, []);

  return { ...state, reload: load };
}
