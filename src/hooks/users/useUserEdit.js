import { useCallback, useState } from "react";
import { updateUserRequest } from "../../features/user/userApi";
import {
  createEmptyEditUserForm,
  getUpdateUserInputError,
  toUpdateUserPayload,
} from "../../features/user/userFormLogic";

const toEditForm = (user) => ({
  id: String(user.id),
  email: user.email || "",
  name: user.name || "",
  username: user.username || "",
  department: user.department || "",
});

export default function useUserEdit({ users, loadUsers }) {
  const [editForm, setEditForm] = useState(createEmptyEditUserForm);
  const [updatingUser, setUpdatingUser] = useState(false);

  const onSelectUserForEdit = useCallback(
    (userId) => {
      setEditForm((prev) => ({ ...prev, id: userId }));
      if (!userId) {
        setEditForm(createEmptyEditUserForm());
        return;
      }

      const selectedUser = users.find(
        (user) => user.id === Number(userId),
      );
      if (!selectedUser) {
        return;
      }

      setEditForm(toEditForm(selectedUser));
    },
    [users],
  );

  const onEditFormChange = useCallback((field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onUpdateUser = useCallback(async () => {
    const inputError = getUpdateUserInputError(editForm);
    if (inputError) {
      alert(inputError);
      return;
    }

    try {
      setUpdatingUser(true);
      await updateUserRequest(Number(editForm.id), toUpdateUserPayload(editForm));

      let latestUsers = users;
      if (loadUsers) {
        latestUsers = await loadUsers();
      }

      const updatedUser = latestUsers.find(
        (user) => user.id === Number(editForm.id),
      );
      if (updatedUser) {
        setEditForm(toEditForm(updatedUser));
      }
      alert("Cập nhật người dùng thành công");
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Cập nhật người dùng thất bại";
      alert(message);
    } finally {
      setUpdatingUser(false);
    }
  }, [editForm, loadUsers, users]);

  return {
    editForm,
    updatingUser,
    onSelectUserForEdit,
    onEditFormChange,
    onUpdateUser,
  };
}
