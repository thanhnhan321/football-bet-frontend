import axiosClient from "../../services/axiosClient";

export const fetchUsersRequest = async () => {
  const res = await axiosClient.get("/user/user-list");
  return res.data;
};

export const createUserRequest = async (data) => {
  const payload = {
    email: data.email,
    name: data.name,
    username: data.username,
    department: data.department,
  };

  await axiosClient.post("/user/create-user", payload);
};

export const updateUserRequest = async (id, data) => {
  const payload = {
    email: data.email,
    name: data.name,
    username: data.username,
    department: data.department,
  };

  if (data.password && data.password.trim()) {
    payload.password = data.password;
  }

  await axiosClient.put(`/user/update-user/${id}`, payload);
};

export const deleteUserRequest = async (id) => {
  await axiosClient.put(`/user/delete-user/${id}`);
};

export const fetchRolesRequest = async () => {
  const res = await axiosClient.get("/role/role-list");
  return res.data;
};

export const fetchDepartmentsRequest = async () => {
  const res = await axiosClient.get("/department/department-list");
  return res.data;
};

export const assignUserRoleRequest = async ({ user_id, role_id }) => {
  const res = await axiosClient.post("/role/create-user-role", { user_id, role_id });
  return res.data;
};

export const fetchUserRolesRequest = async (userId) => {
  const res = await axiosClient.get(`/role/user-roles/${userId}`);
  return res.data;
};
