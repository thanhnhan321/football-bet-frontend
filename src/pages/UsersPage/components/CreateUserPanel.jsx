import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

function CreateUserPanel({
  createForm,
  departments,
  loading,
  creating,
  onCreateFormChange,
  onCreate,
}) {
  return (
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
  );
}

export default CreateUserPanel;
