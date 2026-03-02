import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h3>Admin</h3>
        <ul>
          <li>
            <NavLink to="matches">Quản lý trận</NavLink>
          </li>
        </ul>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
