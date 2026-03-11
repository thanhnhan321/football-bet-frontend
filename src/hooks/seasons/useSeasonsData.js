import { useCallback, useEffect, useState } from "react";
import { fetchSeasonsRequest } from "../../features/season/seasonApi";

export default function useSeasonsData() {
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSeasons = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSeasonsRequest();
      const list = Array.isArray(data) ? data : [];
      setSeasons(list);
      return list;
    } catch {
      setSeasons([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSeasons();
  }, [loadSeasons]);

  return {
    seasons,
    loading,
    loadSeasons,
  };
}
