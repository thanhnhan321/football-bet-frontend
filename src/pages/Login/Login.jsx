import { useState } from "react";
import axios from "axios";
import "./Login.css";
import login_logo from "../../assets/logos/login-logo.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username: username,
        password: password,
      });
      ``;

      console.log(response.data);

      localStorage.setItem("token", response.data.access_token);
      alert("Dang nhap thanh cong!");
    } catch (error) {
      alert("Sai mat khau hoac tai khoan!");
    }
  };

  const handleLdapLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/login-ldap", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      alert("Dang nhap LDAP thanh cong!");
    } catch (error) {
      alert("LDAP login that bai!");
    }
  };
  return (
    <>
      <div className="login-wrapper">
        <div className="login-box">
          <img src={login_logo} alt="Logo" className="login-logo" />
          <h1 className="login-title">Trổ tài dự đoán</h1>
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <button className="button-login" type="submit">
              Đăng nhập
            </button>
            <button
              className="button-ldap"
              type="button"
              onClick={handleLdapLogin}
            >
              Đăng nhập bằng tài khoản Mobifone
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
