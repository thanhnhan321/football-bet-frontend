export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const USER_MENU_ITEMS = [
  { key: "create", label: "Tạo người dùng" },
  { key: "assign", label: "Phân quyền" },
  { key: "edit", label: "Sửa người dùng" },
  { key: "delete", label: "Xóa người dùng" },
];

export const USER_TABLE_COLUMNS = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "name", label: "Họ và tên" },
  { key: "username", label: "Tên đăng nhập" },
  { key: "department", label: "Bộ phận" },
  { key: "roles", label: "Vai trò" },
  { key: "initiated_date", label: "Ngày tạo" },
];
