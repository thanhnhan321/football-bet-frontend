import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import "./AdminLayout.css";

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.name);
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state) => state.auth.role) || "member";
  const displayName = name || username || "user";

  const onLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!confirmed) {
      return;
    }
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h3>{`Xin chào ${displayName} (${role})`}</h3>
        <ul>
          <li>
            <NavLink to="users">Quản lý người dùng</NavLink>
          </li>
          <li>
            <NavLink to="seasons">Quản lý mùa giải</NavLink>
          </li>
          <li>
            <NavLink to="matches">Quản lý trận</NavLink>
          </li>
        </ul>

        <div className="admin-sidebar-footer">
          <button type="button" className="admin-logout-btn" onClick={onLogout}>
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
