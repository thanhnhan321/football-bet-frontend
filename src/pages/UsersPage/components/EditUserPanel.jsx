import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

function EditUserPanel({
  editForm,
  users,
  departments,
  updatingUser,
  onSelectUserForEdit,
  onEditFormChange,
  onUpdateUser,
}) {
  return (
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
  );
}

export default EditUserPanel;
