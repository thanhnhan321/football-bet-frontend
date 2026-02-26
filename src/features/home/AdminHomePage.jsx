import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";

function AdminHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <main className="home-shell">
      <h1>Admin Dashboard</h1>
      <p>Xin chao {username || "admin"}. Ban dang dang nhap voi quyen admin.</p>
      <button className="btn-primary" type="button" onClick={handleLogout}>
        Dang xuat
      </button>
    </main>
  );
}

export default AdminHomePage;
