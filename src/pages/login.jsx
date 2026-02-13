import { useState } from "react";
import axios from "axios";

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

      console.log(response.data);

      localStorage.setItem("token", response.data.access_token);
      alert("Dang nhap thanh cong!");
    } catch (error) {
      alert("Sai mat khau hoac tai khoan!");
    }
  };

  return <div style={{ padding: "40px" }}>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
        <input type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)} 
        />
    <br/><br/>
        <input type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} 
        />
    <br/><br/>
        <button type="submit">Login</button>
    </form>
  </div>;
}

export default Login;
