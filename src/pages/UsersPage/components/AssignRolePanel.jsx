import Button from "../../../components/Button";
import Select from "../../../components/Select";

function AssignRolePanel({
  assignForm,
  users,
  roles,
  assigningRole,
  userRoles,
  setAssignForm,
  onAssignRole,
}) {
  return (
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
        {userRoles.length ? <p>{userRoles.join(", ")}</p> : <p>Người dùng chưa có vai trò.</p>}
      </div>
    </div>
  );
}

export default AssignRolePanel;
