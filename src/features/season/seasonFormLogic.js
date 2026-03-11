export const createEmptyCreateSeasonForm = () => ({
  season_name: "",
  season_start: "",
  season_end: "",
});

export const createEmptyEditSeasonForm = () => ({
  id: "",
  season_name: "",
  season_start: "",
  season_end: "",
  season_image: "",
});

const getCommonSeasonInputError = (form) => {
  const seasonName = form.season_name ? form.season_name.trim() : "";

  if (!seasonName) return "Vui lòng nhập tên mùa giải";
  if (!form.season_start) return "Vui lòng chọn ngày bắt đầu";
  if (!form.season_end) return "Vui lòng chọn ngày kết thúc";

  if (new Date(form.season_end) <= new Date(form.season_start)) {
    return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
  }

  return null;
};

export const getCreateSeasonInputError = (form) =>
  getCommonSeasonInputError(form);

export const getUpdateSeasonInputError = (form) => {
  if (!form.id) return "Vui lòng chọn mùa giải cần sửa";
  return getCommonSeasonInputError(form);
};

export const toCreateSeasonPayload = (form) => ({
  season_name: form.season_name.trim(),
  season_start: form.season_start,
  season_end: form.season_end,
});

export const toUpdateSeasonPayload = (form) => ({
  season_name: form.season_name.trim(),
  season_start: form.season_start,
  season_end: form.season_end,
  season_image: form.season_image || "",
});

export default createEmptyEditSeasonForm;
