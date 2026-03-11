import { useCallback, useEffect, useState } from "react";
import {
  assignUserRoleRequest,
  fetchUserRolesRequest,
} from "../../features/user/userApi";

export default function useUserAssignRole() {
  const [assignForm, setAssignForm] = useState({
    user_id: "",
    role_id: "",
  });
  const [userRoles, setUserRoles] = useState([]);
  const [assigningRole, setAssigningRole] = useState(false);

  useEffect(() => {
    if (!assignForm.user_id) {
      setUserRoles([]);
      return;
    }

    const loadSelectedUserRoles = async () => {
      try {
        const data = await fetchUserRolesRequest(Number(assignForm.user_id));
        setUserRoles(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error?.response?.status === 404) {
          setUserRoles([]);
          return;
        }
        setUserRoles([]);
      }
    };

    loadSelectedUserRoles();
  }, [assignForm.user_id]);

  const onAssignRole = useCallback(async () => {
    if (!assignForm.user_id) {
      alert("Vui lòng chọn người dùng");
      return;
    }
    if (!assignForm.role_id) {
      alert("Vui lòng chọn vai trò");
      return;
    }

    try {
      setAssigningRole(true);
      await assignUserRoleRequest({
        user_id: Number(assignForm.user_id),
        role_id: Number(assignForm.role_id),
      });
      const currentRoles = await fetchUserRolesRequest(
        Number(assignForm.user_id),
      );
      setUserRoles(Array.isArray(currentRoles) ? currentRoles : []);
      alert("Phân quyền thành công");
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Phân quyền thất bại";
      alert(message);
    } finally {
      setAssigningRole(false);
    }
  }, [assignForm.role_id, assignForm.user_id]);

  return {
    assignForm,
    setAssignForm,
    assigningRole,
    userRoles,
    onAssignRole,
  };
}
