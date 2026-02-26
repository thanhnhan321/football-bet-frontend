import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import AdminHome from "./pages/Home/AdminHome";
import MemberHome from "./pages/Home/MemberHome";
import ProtectedRoute from "./components/ProtectedRoute";

function HomeRedirect() {
  const { role } = useSelector((state) => state.auth);

  if (role === "admin") {
    return <Navigate to="/home/admin" replace />;
  }

  return <Navigate to="/home/member" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeRedirect />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home/member"
        element={
          <ProtectedRoute allowedRoles={["member", "admin"]}>
            <MemberHome />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
