export const SEASON_MENU_ITEMS = [
  { key: "create", label: "Tạo mùa giải" },
  { key: "edit", label: "Sửa mùa giải" },
  { key: "delete", label: "Xóa mùa giải" },
];

export const SEASON_CREATE_FIELDS = [
  {
    key: "season_name",
    id: "season-name",
    label: "Tên mùa giải (season_name)",
    type: "text",
    placeholder: "VD: Premier League 2026/27",
  },
  {
    key: "season_start",
    id: "season-start",
    label: "Ngày bắt đầu (season_start)",
    type: "date",
  },
  {
    key: "season_end",
    id: "season-end",
    label: "Ngày kết thúc (season_end)",
    type: "date",
  },
];
