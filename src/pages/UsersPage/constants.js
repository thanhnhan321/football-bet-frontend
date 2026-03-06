export const USER_MENU_ITEMS = [
  { key: "create", label: "Tạo người dùng" },
  { key: "assign", label: "Phân quyền" },
  { key: "edit", label: "Sửa người dùng" },
  { key: "delete", label: "Xóa người dùng" },
];

export const USER_CREATE_FIELDS = (departments = []) => [
  {
    key: "email",
    id: "create-email",
    label: "Email (email)",
    type: "email",
    placeholder: "VD: user@gmail.com",
  },
  {
    key: "name",
    id: "create-name",
    label: "Họ và tên (name)",
    type: "text",
    placeholder: "VD: Nguyen Van A",
  },
  {
    key: "username",
    id: "create-username",
    label: "Tên đăng nhập (username)",
    type: "text",
    placeholder: "VD: nguyenvana",
  },
  {
    key: "department",
    id: "create-department",
    label: "Bộ phận (department)",
    type: "select",
    options: [
      { value: "", label: "Chọn bộ phận" },
      ...departments.map((department) => ({
        value: department.department_name,
        label: `${department.id} - ${department.department_name}`,
      })),
    ],
  },
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
