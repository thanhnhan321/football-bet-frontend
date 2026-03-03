import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import MatchesPage from "../pages/MatchesPage/MatchesPage";
import SeasonsPage from "../pages/SeasonsPage/SeasonsPage";
import UsersPage from "../pages/UsersPage/UsersPage";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

function HomeRedirect() {
  const role = useSelector((state) => state.auth.role);
  if (role === "admin") {
    return <Navigate to="/home/admin/users" replace />;
  }
  return <Navigate to="/home/member" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />

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
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="users" replace />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="seasons" element={<SeasonsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      <Route
        path="/home/member"
        element={
          <ProtectedRoute allowedRoles={["member", "admin"]}>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRoutes;
