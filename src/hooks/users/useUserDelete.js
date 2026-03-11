import { useCallback, useState } from "react";
import { deleteUserRequest } from "../../features/user/userApi";

export default function useUserDelete({ loadUsers, onAfterDelete }) {
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deletingUser, setDeletingUser] = useState(false);

  const onDeleteUser = useCallback(async () => {
    if (!deleteUserId) {
      alert("Vui lòng chọn người dùng cần xóa");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      return;
    }

    try {
      setDeletingUser(true);
      await deleteUserRequest(Number(deleteUserId));
      if (loadUsers) {
        await loadUsers();
      }
      if (onAfterDelete) {
        onAfterDelete(deleteUserId);
      }
      setDeleteUserId("");
      alert("Xóa người dùng thành công");
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Xóa người dùng thất bại";
      alert(message);
    } finally {
      setDeletingUser(false);
    }
  }, [deleteUserId, loadUsers, onAfterDelete]);

  return {
    deleteUserId,
    setDeleteUserId,
    deletingUser,
    onDeleteUser,
  };
}
