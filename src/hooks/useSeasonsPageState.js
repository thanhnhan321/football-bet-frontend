import { useState, useEffect } from "react";
import {
  createSeasonRequest,
  fetchSeasonsRequest,
} from "../features/season/seasonApi";

export default function useSeasonsPageState() {
  const [activeMenu, setActiveMenu] = useState("create");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [createForm, setCreateForm] = useState({
    season_name: "",
    season_start: "",
    season_end: "",
  });

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);
        const data = await fetchSeasonsRequest();
        setSeasons(data);
      } catch (error) {
        console.error("Failed to fetch seasons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeasons();
  }, []);

  const onCreateFormChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const onCreate = async () => {
    if (!createForm.season_name.trim()) {
      alert("Vui lòng nhập tên mùa giải");
      return;
    }
    if (!createForm.season_start) {
      alert("Vui lòng chọn ngày bắt đầu");
      return;
    }
    if (!createForm.season_end) {
      alert("Vui lòng chọn ngày kết thúc");
      return;
    }

    try {
      setCreating(true);
      await createSeasonRequest({
        season_name: createForm.season_name.trim(),
        season_start: createForm.season_start,
        season_end: createForm.season_end,
      });
      setCreateForm({
        season_name: "",
        season_start: "",
        season_end: "",
      });
      alert("Tạo mùa giải thành công");
      // Refresh seasons list
      const data = await fetchSeasonsRequest();
      setSeasons(data);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Tạo mùa giải thất bại";
      alert(message);
    } finally {
      setCreating(false);
    }
  };

  return {
    activeMenu,
    setActiveMenu,
    loading,
    creating,
    seasons,
    createForm,
    onCreateFormChange,
    onCreate,
  };
}
