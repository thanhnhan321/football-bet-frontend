import { useCallback, useState } from "react";
import { createSeasonRequest } from "../../features/season/seasonApi";

const createEmptySeasonForm = () => ({
  season_name: "",
  season_start: "",
  season_end: "",
});

export default function useSeasonCreate({ loadSeasons }) {
  const [createForm, setCreateForm] = useState(createEmptySeasonForm);
  const [creating, setCreating] = useState(false);

  const onCreateFormChange = useCallback((field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onCreate = useCallback(async () => {
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
    if (new Date(createForm.season_end) <= new Date(createForm.season_start)) {
      alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
      return;
    }

    try {
      setCreating(true);
      await createSeasonRequest({
        season_name: createForm.season_name.trim(),
        season_start: createForm.season_start,
        season_end: createForm.season_end,
      });
      setCreateForm(createEmptySeasonForm());
      if (loadSeasons) {
        await loadSeasons();
      }
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
  }, [createForm, loadSeasons]);

  return {
    createForm,
    creating,
    onCreateFormChange,
    onCreate,
  };
}
