import { useCallback, useState } from "react";
import { createUserRequest } from "../../features/user/userApi";
import {
  createEmptyCreateUserForm,
  getCreateUserInputError,
  toCreateUserPayload,
} from "../../features/user/userFormLogic";

export default function useUserCreate({ loadUsers }) {
  const [createForm, setCreateForm] = useState(createEmptyCreateUserForm);
  const [creating, setCreating] = useState(false);

  const onCreateFormChange = useCallback((field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onCreate = useCallback(async () => {
    const inputError = getCreateUserInputError(createForm);
    if (inputError) {
      alert(inputError);
      return;
    }

    try {
      setCreating(true);
      await createUserRequest(toCreateUserPayload(createForm));
      setCreateForm(createEmptyCreateUserForm());
      if (loadUsers) {
        await loadUsers();
      }
      alert("Tạo người dùng thành công");
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Tạo người dùng thất bại";
      alert(message);
    } finally {
      setCreating(false);
    }
  }, [createForm, loadUsers]);

  return {
    createForm,
    creating,
    onCreateFormChange,
    onCreate,
  };
}
