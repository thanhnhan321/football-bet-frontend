import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../features/auth/LoginPage";
import AdminHomePage from "../features/home/AdminHomePage";
import MemberHomePage from "../features/home/MemberHomePage";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import AdminLayout from "../features/admin/Adminlayout/AdminLayout";
import UserManagement from "../features/admin/UserManagement/UserManagement";
import MatchManagement from "../features/admin/MatchManagement/MatchManagement";
import MiniGameManagement from "../features/admin/MatchManagement/MatchManagement";
import StatisticsPage from "../features/admin/StatisticsPage/StatisticsPage";

//Redirect by role
function HomeRedirect() {
  const { role } = useSelector((state) => state.auth);

  if (role === "admin") {
    return <Navigate to="/home/admin" replace />;
  }

  return <Navigate to="/home/member" replace />;
}

function AppRouter() {
  return (
    <Routes>
      {/* Redirect pages */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Need to login to access Homedirect function */}
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
        <Route path="users" element={<UserManagement />} />
        <Route path="matches" element={<MatchManagement />} />
        <Route path="minigames" element={<MiniGameManagement />} />
        <Route path="statistics" element={<StatisticsPage />} />
      </Route>
      <Route
        path="/home/member"
        element={
          <ProtectedRoute allowedRoles={["member", "admin"]}>
            <MemberHomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRouter;
