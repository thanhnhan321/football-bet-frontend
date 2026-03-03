import { useEffect, useMemo, useState } from "react";
import {
  assignUserRoleRequest,
  createUserRequest,
  deleteUserRequest,
  fetchDepartmentsRequest,
  fetchRolesRequest,
  fetchUserRolesRequest,
  fetchUsersRequest,
  updateUserRequest,
} from "../../../features/user/userApi";
import { EMAIL_PATTERN } from "../constants";

export default function useUsersPageState() {
  const [activeMenu, setActiveMenu] = useState("create");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [assigningRole, setAssigningRole] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });
  const [createForm, setCreateForm] = useState({
    email: "",
    name: "",
    username: "",
    department: "",
  });
  const [assignForm, setAssignForm] = useState({
    user_id: "",
    role_id: "",
  });
  const [editForm, setEditForm] = useState({
    id: "",
    email: "",
    name: "",
    username: "",
    department: "",
  });
  const [deleteUserId, setDeleteUserId] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsersRequest();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const data = await fetchRolesRequest();
      setRoles(Array.isArray(data) ? data : []);
    } catch {
      setRoles([]);
    }
  };

  const loadDepartments = async () => {
    try {
      const data = await fetchDepartmentsRequest();
      setDepartments(Array.isArray(data) ? data : []);
    } catch {
      setDepartments([]);
    }
  };

  useEffect(() => {
    loadUsers();
    loadRoles();
    loadDepartments();
  }, []);

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

  const onCreateFormChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const getCreateUserInputError = () => {
    const email = createForm.email.trim();
    const name = createForm.name.trim();
    const username = createForm.username.trim();
    const department = createForm.department.trim();

    if (!email) return "Vui lòng nhập Email";
    if (!EMAIL_PATTERN.test(email)) return "Email không hợp lệ";

    if (!name) return "Vui lòng nhập Họ và tên";

    if (!username) return "Vui lòng nhập Tên đăng nhập";
    if (/\s/.test(username)) return "Tên đăng nhập không được chứa khoảng trắng";

    if (!department) return "Vui lòng chọn Bộ phận";

    return null;
  };

  const onCreate = async () => {
    const inputError = getCreateUserInputError();
    if (inputError) {
      alert(inputError);
      return;
    }

    try {
      setCreating(true);
      await createUserRequest({
        email: createForm.email.trim(),
        name: createForm.name.trim(),
        username: createForm.username.trim(),
        department: createForm.department.trim(),
      });

      setCreateForm({
        email: "",
        name: "",
        username: "",
        department: "",
      });
      await loadUsers();
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
  };

  const onAssignRole = async () => {
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
      const currentRoles = await fetchUserRolesRequest(Number(assignForm.user_id));
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
  };

  const onSelectUserForEdit = (userId) => {
    setEditForm((prev) => ({ ...prev, id: userId }));
    if (!userId) {
      setEditForm({
        id: "",
        email: "",
        name: "",
        username: "",
        department: "",
      });
      return;
    }

    const selectedUser = users.find((user) => user.id === Number(userId));
    if (!selectedUser) {
      return;
    }

    setEditForm({
      id: String(selectedUser.id),
      email: selectedUser.email || "",
      name: selectedUser.name || "",
      username: selectedUser.username || "",
      department: selectedUser.department || "",
    });
  };

  const onEditFormChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const getUpdateUserInputError = () => {
    if (!editForm.id) return "Vui lòng chọn người dùng cần sửa";

    const email = editForm.email.trim();
    const name = editForm.name.trim();
    const username = editForm.username.trim();
    const department = editForm.department.trim();

    if (!email) return "Vui lòng nhập Email";
    if (!EMAIL_PATTERN.test(email)) return "Email không hợp lệ";

    if (!name) return "Vui lòng nhập Họ và tên";

    if (!username) return "Vui lòng nhập Tên đăng nhập";
    if (/\s/.test(username)) return "Tên đăng nhập không được chứa khoảng trắng";

    if (!department) return "Vui lòng chọn Bộ phận";

    return null;
  };

  const onUpdateUser = async () => {
    const inputError = getUpdateUserInputError();
    if (inputError) {
      alert(inputError);
      return;
    }

    try {
      setUpdatingUser(true);
      await updateUserRequest(Number(editForm.id), {
        email: editForm.email.trim(),
        name: editForm.name.trim(),
        username: editForm.username.trim(),
        department: editForm.department.trim(),
      });

      await loadUsers();
      onSelectUserForEdit(editForm.id);
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
  };

  const onDeleteUser = async () => {
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
      await loadUsers();
      if (assignForm.user_id === deleteUserId) {
        setAssignForm((prev) => ({ ...prev, user_id: "" }));
      }
      if (editForm.id === deleteUserId) {
        onSelectUserForEdit("");
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
  };

  const getSortValue = (user, key) => {
    if (key === "id") return Number(user.id) || 0;
    if (key === "initiated_date") return new Date(user.initiated_date || 0).getTime() || 0;
    if (key === "roles") {
      return Array.isArray(user.roles) ? user.roles.join(", ").toLowerCase() : "";
    }
    return String(user[key] ?? "").toLowerCase();
  };

  const sortedUsers = useMemo(() => {
    const sorted = [...users];
    const factor = sortConfig.direction === "asc" ? 1 : -1;
    sorted.sort((a, b) => {
      const valueA = getSortValue(a, sortConfig.key);
      const valueB = getSortValue(b, sortConfig.key);
      if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * factor;
      }
      return String(valueA).localeCompare(String(valueB), "vi", {
        sensitivity: "base",
        numeric: true,
      }) * factor;
    });
    return sorted;
  }, [users, sortConfig]);

  const onSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return {
    activeMenu,
    setActiveMenu,
    users,
    roles,
    departments,
    userRoles,
    loading,
    creating,
    assigningRole,
    updatingUser,
    deletingUser,
    createForm,
    assignForm,
    setAssignForm,
    editForm,
    deleteUserId,
    setDeleteUserId,
    sortConfig,
    sortedUsers,
    onCreateFormChange,
    onCreate,
    onAssignRole,
    onSelectUserForEdit,
    onEditFormChange,
    onUpdateUser,
    onDeleteUser,
    onSort,
    getSortIcon,
  };
}
