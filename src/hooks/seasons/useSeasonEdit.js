import { useCallback, useState } from "react";
import createEmptyEditSeasonForm, {
  getUpdateSeasonInputError,
  toUpdateSeasonPayload,
} from "../../features/season/seasonFormLogic";
import { updateSeasonRequest } from "../../features/season/seasonApi";

const toEditForm = (season) => ({
  id: String(season.id),
  season_name: season.season_name || "",
  season_start: season.season_start || "",
  season_end: season.season_end || "",
  season_image: season.season_image || "",
});

export default function useSeasonEdit({ seasons, loadSeasons }) {
  const [editForm, setEditForm] = useState(createEmptyEditSeasonForm);
  const [onUpdating, setOnUpdating] = useState(false);
  const onSelectSeasonForEdit = useCallback(
    (seasonId) => {
      setEditForm((prev) => ({ ...prev, id: seasonId }));
      if (!seasonId) {
        setEditForm(createEmptyEditSeasonForm());
        return;
      }

      const selectedSeason = seasons.find(
        (season) => season.id === Number(seasonId),
      );
      if (!selectedSeason) {
        return;
      }

      setEditForm(toEditForm(selectedSeason));
    },
    [seasons],
  );

  const onEditFormChange = useCallback((field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onPressButton = useCallback(async () => {
    const inputError = getUpdateSeasonInputError(editForm);
    if (inputError) {
      alert(inputError);
      return;
    }

    try {
      setOnUpdating(true);
      await updateSeasonRequest(
        Number(editForm.id),
        toUpdateSeasonPayload(editForm),
      );

      let latestSeasons = seasons;
      if (loadSeasons) {
        latestSeasons = await loadSeasons();
      }

      const updatedSeason = latestSeasons.find(
        (season) => season.id === Number(editForm.id),
      );
      if (updatedSeason) {
        setEditForm(toEditForm(updatedSeason));
      }
      alert("Cập nhật người dùng thành công!");
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Cập nhật người dùng thất bại!";
      alert(message);
    } finally {
      setOnUpdating(false);
    }
  }, [editForm, loadSeasons, seasons]);

  return {
    editForm,
    onSelectSeasonForEdit,
    onEditFormChange,
    onPressButton,
    onUpdating,
  };
}
