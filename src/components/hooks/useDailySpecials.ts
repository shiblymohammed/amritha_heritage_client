import { useState, useEffect, useCallback, useMemo } from "react";

export interface DailySpecial {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}


export const useDailySpecials = () => {
  const [dailySpecials, setDailySpecials] = useState<DailySpecial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  // Memoized fetch function
  const fetchDailySpecials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setIsRetrying(false);

      // Resolve API base URL with production fallback for Vercel deployment
      const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
      const fallbackProdBase = 'https://amritha-heritage-backend.onrender.com/api';
      let API_BASE_URL = envBase;
      
      // If no env var set, detect production environment and use fallback
      if (!API_BASE_URL) {
        try {
          const host = typeof window !== 'undefined' ? window.location.hostname : '';
          const isProdHost = host.endsWith('vercel.app') || host.includes('amrithaheritage.com');
          API_BASE_URL = isProdHost ? fallbackProdBase : 'http://127.0.0.1:8000/api';
        } catch {
          API_BASE_URL = 'http://127.0.0.1:8000/api';
        }
      }
      
      // Try to fetch from API
      const response = await fetch(
        `${API_BASE_URL}/menu/daily-specials/active/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      const data = responseData.results || [];

      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error("No items for today");
      }

      // Transform the data
      const transformedData: DailySpecial[] = data.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(),
        name: item.name || "Unnamed Dish",
        description: item.description || "No description available",
        price: parseFloat(item.price) || 0,
        image: item.image || "/images/Dining/menu/default-dish.jpg",
      }));

      setDailySpecials(transformedData);
      setLastFetched(new Date());
      setError(null);
    } catch (err) {
      console.error("Error fetching daily specials:", err);
      const errorMessage = "No items for today";
      setError(errorMessage);
      setDailySpecials([]);
      setLastFetched(new Date());
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  }, []);

  // Memoized refetch function
  const refetch = useCallback(async () => {
    await fetchDailySpecials();
  }, [fetchDailySpecials]);

  // Initial fetch
  useEffect(() => {
    fetchDailySpecials();
  }, [fetchDailySpecials]);

  // Memoized return object
  const returnValue = useMemo(
    () => ({
      dailySpecials,
      loading,
      error,
      refetch,
      isRetrying,
      lastFetched,
    }),
    [dailySpecials, loading, error, refetch, isRetrying, lastFetched]
  );

  return returnValue;
};
