import axiosClient from "../../services/axiosClient";

export const loginRequest = async ({ username, password }) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const { data } = await axiosClient.post("/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return data;
};

export const changeFirstLoginPasswordRequest = async ({
  username,
  current_password,
  new_password,
}) => {
  const { data } = await axiosClient.post("/first-login/change-password", {
    username,
    current_password,
    new_password,
  });
  return data;
};
