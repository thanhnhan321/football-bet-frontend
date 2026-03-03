import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAuthError, login } from "../../features/auth/authSlice";
import { changeFirstLoginPasswordRequest } from "../../features/auth/authApi";
import { isTokenExpired } from "../../features/auth/tokenUtils";
import loginLogo from "../../assets/logos/login-logo.svg";
import "./LoginPage.css";

const isFirstLoginRequiredMessage = (message) =>
  String(message || "").toLowerCase().includes("mật khẩu mặc định");

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showFirstLoginForm, setShowFirstLoginForm] = useState(false);
  const [firstLoginLoading, setFirstLoginLoading] = useState(false);
  const [firstLoginMessage, setFirstLoginMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role, loading, error } = useSelector((state) => state.auth);
  const tokenExpired = token ? isTokenExpired(token) : false;
  const params = new URLSearchParams(location.search);
  const sessionExpired = params.get("reason") === "session_expired";

  useEffect(() => {
    if (!token || tokenExpired) {
      return;
    }

    if (role === "admin") {
      navigate("/home/admin/users", { replace: true });
      return;
    }

    navigate("/home/member", { replace: true });
  }, [navigate, role, token, tokenExpired]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstLoginMessage("");
    const resultAction = await dispatch(login({ username: username.trim(), password }));
    if (login.rejected.match(resultAction)) {
      const errorMessage = typeof resultAction.payload === "string" ? resultAction.payload : "";
      setShowFirstLoginForm(isFirstLoginRequiredMessage(errorMessage));
      return;
    }
    setShowFirstLoginForm(false);
  };

  const handleChangeFirstLoginPassword = async (event) => {
    event.preventDefault();
    const normalizedUsername = username.trim();
    const normalizedNewPassword = newPassword.trim();

    if (!normalizedUsername) {
      setFirstLoginMessage("Vui lòng nhập tài khoản.");
      return;
    }
    if (!password) {
      setFirstLoginMessage("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }
    if (!normalizedNewPassword) {
      setFirstLoginMessage("Vui lòng nhập mật khẩu mới.");
      return;
    }
    if (/\s/.test(normalizedNewPassword)) {
      setFirstLoginMessage("Mật khẩu mới không được chứa khoảng trắng.");
      return;
    }
    if (normalizedNewPassword === normalizedUsername) {
      setFirstLoginMessage("Mật khẩu mới không được trùng username.");
      return;
    }
    if (normalizedNewPassword !== confirmNewPassword.trim()) {
      setFirstLoginMessage("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    try {
      setFirstLoginLoading(true);
      await changeFirstLoginPasswordRequest({
        username: normalizedUsername,
        current_password: password,
        new_password: normalizedNewPassword,
      });
      dispatch(clearAuthError());
      setShowFirstLoginForm(false);
      setNewPassword("");
      setConfirmNewPassword("");
      setPassword("");
      setFirstLoginMessage("Đổi mật khẩu lần đầu thành công. Vui lòng đăng nhập lại.");
    } catch (error) {
      setFirstLoginMessage(
        error?.response?.data?.detail || error?.message || "Đổi mật khẩu thất bại.",
      );
    } finally {
      setFirstLoginLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <img src={loginLogo} alt="Football Bet" className="login-logo" />
        <p className="login-eyebrow">Football Bet Platform</p>
        <h1 id="login-title" className="login-title">
          Dang nhap he thong
        </h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Tai khoan</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="Nhap tai khoan"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Mat khau</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Nhap mat khau"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {sessionExpired ? (
            <p className="login-error">Phien dang nhap da het han. Vui long dang nhap lai.</p>
          ) : null}

          {error ? <p className="login-error">{error}</p> : null}
          {firstLoginMessage ? (
            <p className={showFirstLoginForm ? "login-error" : "login-success"}>
              {firstLoginMessage}
            </p>
          ) : null}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Dang xu ly..." : "Dang nhap"}
          </button>
        </form>

        {showFirstLoginForm ? (
          <form className="login-form first-login-form" onSubmit={handleChangeFirstLoginPassword}>
            <h3>Doi mat khau lan dau</h3>
            <label htmlFor="new-password">Mat khau moi</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              placeholder="Nhap mat khau moi"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label htmlFor="confirm-new-password">Xac nhan mat khau moi</label>
            <input
              id="confirm-new-password"
              type="password"
              autoComplete="new-password"
              placeholder="Nhap lai mat khau moi"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />

            <button className="btn-primary" type="submit" disabled={firstLoginLoading}>
              {firstLoginLoading ? "Dang xu ly..." : "Doi mat khau"}
            </button>
          </form>
        ) : null}
      </section>
    </main>
  );
}

export default LoginPage;
