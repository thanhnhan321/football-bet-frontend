import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Table from "../../components/Table";
import {
  assignUserRoleRequest,
  createUserRequest,
  deleteUserRequest,
  fetchDepartmentsRequest,
  fetchRolesRequest,
  fetchUserRolesRequest,
  fetchUsersRequest,
  updateUserRequest,
} from "../../features/user/userApi";
import { formatDate } from "../../utils/formatDate";
import "./UsersPage.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_MENU_ITEMS = [
  { key: "create", label: "Tạo người dùng" },
  { key: "assign", label: "Phân quyền" },
  { key: "edit", label: "Sửa người dùng" },
  { key: "delete", label: "Xóa người dùng" },
];
const USER_TABLE_COLUMNS = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "name", label: "Họ và tên" },
  { key: "username", label: "Tên đăng nhập" },
  { key: "department", label: "Bộ phận" },
  { key: "roles", label: "Vai trò" },
  { key: "initiated_date", label: "Ngày tạo" },
];

function UsersPage() {
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

  return (
    <div className="admin-user-page">
      <div className="user-menu">
        {USER_MENU_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`user-menu-item ${activeMenu === item.key ? "active" : ""}`}
            onClick={() => setActiveMenu(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeMenu === "create" && (
        <div className="user-function-panel">
          <h3>Tạo người dùng</h3>
          <p className="user-note">
            Mật khẩu ban đầu được đặt bằng username. Người dùng phải đổi mật khẩu ở lần đăng nhập đầu tiên.
          </p>
          <div className="user-form-inline">
            <div className="user-field">
              <label className="user-label" htmlFor="create-email">
                Email (email)
              </label>
              <Input
                id="create-email"
                type="email"
                value={createForm.email}
                onChange={(e) => onCreateFormChange("email", e.target.value)}
                placeholder="VD: user@gmail.com"
              />
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="create-name">
                Họ và tên (name)
              </label>
              <Input
                id="create-name"
                type="text"
                value={createForm.name}
                onChange={(e) => onCreateFormChange("name", e.target.value)}
                placeholder="VD: Nguyen Van A"
              />
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="create-username">
                Tên đăng nhập (username)
              </label>
              <Input
                id="create-username"
                type="text"
                value={createForm.username}
                onChange={(e) => onCreateFormChange("username", e.target.value)}
                placeholder="VD: nguyenvana"
              />
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="create-department">
                Bộ phận (department)
              </label>
              <Select
                id="create-department"
                value={createForm.department}
                onChange={(e) => onCreateFormChange("department", e.target.value)}
              >
                <option value="">Chọn bộ phận</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.department_name}>
                    {`${department.id} - ${department.department_name}`}
                  </option>
                ))}
              </Select>
            </div>

            <div className="user-action">
              <Button onClick={onCreate} disabled={loading || creating}>
                Tạo người dùng
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeMenu === "assign" && (
        <div className="user-function-panel">
          <h3>Phân quyền người dùng</h3>
          <div className="user-form-inline">
            <div className="user-field">
              <label className="user-label" htmlFor="assign-user-id">
                Người dùng
              </label>
              <Select
                id="assign-user-id"
                value={assignForm.user_id}
                onChange={(e) => setAssignForm((prev) => ({ ...prev, user_id: e.target.value }))}
              >
                <option value="">Chọn người dùng</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.id} - ${user.username} (${user.name})`}
                  </option>
                ))}
              </Select>
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="assign-role-id">
                Vai trò
              </label>
              <Select
                id="assign-role-id"
                value={assignForm.role_id}
                onChange={(e) => setAssignForm((prev) => ({ ...prev, role_id: e.target.value }))}
              >
                <option value="">Chọn vai trò</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {`${role.id} - ${role.role_name}`}
                  </option>
                ))}
              </Select>
            </div>

            <div className="user-action">
              <Button onClick={onAssignRole} disabled={assigningRole}>
                Phân quyền
              </Button>
            </div>
          </div>

          <div className="user-role-list">
            <p>Vai trò hiện tại:</p>
            {userRoles.length ? (
              <p>{userRoles.join(", ")}</p>
            ) : (
              <p>Người dùng chưa có vai trò.</p>
            )}
          </div>
        </div>
      )}

      {activeMenu === "edit" && (
        <div className="user-function-panel">
          <h3>Sửa người dùng</h3>
          <div className="user-form-inline">
            <div className="user-field">
              <label className="user-label" htmlFor="edit-user-id">
                Chọn người dùng
              </label>
              <Select
                id="edit-user-id"
                value={editForm.id}
                onChange={(e) => onSelectUserForEdit(e.target.value)}
              >
                <option value="">Chọn người dùng</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.id} - ${user.username} (${user.name})`}
                  </option>
                ))}
              </Select>
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="edit-email">
                Email (email)
              </label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => onEditFormChange("email", e.target.value)}
                placeholder="VD: user@gmail.com"
              />
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="edit-name">
                Họ và tên (name)
              </label>
              <Input
                id="edit-name"
                type="text"
                value={editForm.name}
                onChange={(e) => onEditFormChange("name", e.target.value)}
                placeholder="VD: Nguyen Van A"
              />
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="edit-username">
                Tên đăng nhập (username)
              </label>
              <Input
                id="edit-username"
                type="text"
                value={editForm.username}
                onChange={(e) => onEditFormChange("username", e.target.value)}
                placeholder="VD: nguyenvana"
              />
            </div>

            <div className="user-field">
              <label className="user-label" htmlFor="edit-department">
                Bộ phận (department)
              </label>
              <Select
                id="edit-department"
                value={editForm.department}
                onChange={(e) => onEditFormChange("department", e.target.value)}
              >
                <option value="">Chọn bộ phận</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.department_name}>
                    {`${department.id} - ${department.department_name}`}
                  </option>
                ))}
              </Select>
            </div>

            <div className="user-action">
              <Button onClick={onUpdateUser} disabled={updatingUser}>
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeMenu === "delete" && (
        <div className="user-function-panel">
          <h3>Xóa người dùng</h3>
          <div className="user-form-inline">
            <div className="user-field">
              <label className="user-label" htmlFor="delete-user-id">
                Chọn người dùng cần xóa
              </label>
              <Select
                id="delete-user-id"
                value={deleteUserId}
                onChange={(e) => setDeleteUserId(e.target.value)}
              >
                <option value="">Chọn người dùng</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.id} - ${user.username} (${user.name})`}
                  </option>
                ))}
              </Select>
            </div>

            <div className="user-action">
              <Button variant="danger" onClick={onDeleteUser} disabled={deletingUser}>
                Xóa người dùng
              </Button>
            </div>
          </div>
        </div>
      )}

      <h3>Danh sách người dùng</h3>
      <Table>
        <thead>
          <tr>
            {USER_TABLE_COLUMNS.map((column) => (
              <th key={column.key}>
                <button
                  type="button"
                  className={`user-sort-btn ${sortConfig.key === column.key ? "active" : ""}`}
                  onClick={() => onSort(column.key)}
                >
                  <span>{column.label}</span>
                  <span className="user-sort-icon">{getSortIcon(column.key)}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.department || "-"}</td>
              <td>{Array.isArray(user.roles) && user.roles.length ? user.roles.join(", ") : "-"}</td>
              <td>{formatDate(user.initiated_date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersPage;
