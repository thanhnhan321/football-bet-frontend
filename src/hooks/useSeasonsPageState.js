import { useState } from "react";
import { createSeasonRequest } from "../features/season/seasonApi";

export default function useSeasonsPageState() {
  const [activeMenu, setActiveMenu] = useState("create");
  const loading = false;
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    season_name: "",
    season_start: "",
    season_end: "",
  });

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
    createForm,
    onCreateFormChange,
    onCreate,
  };
}
