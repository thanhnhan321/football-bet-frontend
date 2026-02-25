import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

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

  if (pathname === "/home") {
    return <Home />;
  }

  return <Login onLoginSuccess={() => navigate("/home")} />;
}

export default App;
