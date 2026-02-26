import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AdminHome from "./pages/Home/AdminHome";
import MemberHome from "./pages/Home/MemberHome";

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setPathname(path);
  };

  if (pathname === "/home/admin") {
    return <AdminHome />;
  }

  if (pathname === "/home/member") {
    return <MemberHome />;
  }

  if (pathname === "/home") {
    return <Home />;
  }

  return (
    <Login
      onLoginSuccess={(roleName) => {
        if (roleName === "admin") {
          navigate("/home/admin");
          return;
        }

        if (roleName === "member") {
          navigate("/home/member");
          return;
        }

        navigate("/home");
      }}
    />
  );
}

export default App;
