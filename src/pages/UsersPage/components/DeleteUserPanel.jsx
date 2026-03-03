import Button from "../../../components/Button";
import Select from "../../../components/Select";

function DeleteUserPanel({
  deleteUserId,
  users,
  deletingUser,
  setDeleteUserId,
  onDeleteUser,
}) {
  return (
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
  );
}

export default DeleteUserPanel;
