import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAuthError, login } from "../../features/auth/authSlice";
import { isTokenExpired } from "../../features/auth/tokenUtils";
import loginLogo from "../../assets/logos/login-logo.svg";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/home/admin", { replace: true });
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
    await dispatch(login({ username: username.trim(), password }));
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

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Dang xu ly..." : "Dang nhap"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
