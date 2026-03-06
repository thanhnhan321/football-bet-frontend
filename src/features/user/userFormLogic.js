const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createEmptyCreateUserForm = () => ({
  email: "",
  name: "",
  username: "",
  department: "",
});

export const createEmptyEditUserForm = () => ({
  id: "",
  email: "",
  name: "",
  username: "",
  department: "",
});

const getCommonUserInputError = (form) => {
  const email = form.email.trim();
  const name = form.name.trim();
  const username = form.username.trim();
  const department = form.department.trim();

  if (!email) return "Vui lòng nhập Email";
  if (!EMAIL_PATTERN.test(email)) return "Email không hợp lệ";

  if (!name) return "Vui lòng nhập Họ và tên";

  if (!username) return "Vui lòng nhập Tên đăng nhập";
  if (/\s/.test(username)) return "Tên đăng nhập không được chứa khoảng trắng";

  if (!department) return "Vui lòng chọn Bộ phận";

  return null;
};

export const getCreateUserInputError = (form) => getCommonUserInputError(form);

export const getUpdateUserInputError = (form) => {
  if (!form.id) return "Vui lòng chọn người dùng cần sửa";
  return getCommonUserInputError(form);
};

export const toCreateUserPayload = (form) => ({
  email: form.email.trim(),
  name: form.name.trim(),
  username: form.username.trim(),
  department: form.department.trim(),
});

export const toUpdateUserPayload = (form) => ({
  email: form.email.trim(),
  name: form.name.trim(),
  username: form.username.trim(),
  department: form.department.trim(),
});
