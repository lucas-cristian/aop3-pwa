"use client"
import { useEffect, useState } from "react";

export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) {
           throw new Error("Erro ao buscar dados do servidor");
        }
        const json = await res.json();
        
        if (json && typeof json === 'object' && 'data' in json && 'success' in json) {
          if (!json.success) throw new Error(json.error?.message || json.error || "Erro retornado pela API");
          if (isMounted) setData(json.data as T);
        } else {
          // Fallback se não usar padronização
          if (isMounted) setData(json as T);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}
