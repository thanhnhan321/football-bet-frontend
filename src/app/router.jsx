import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../features/auth/LoginPage";
import AdminHomePage from "../features/home/AdminHomePage";
import MemberHomePage from "../features/home/MemberHomePage";
import ProtectedRoute from "../shared/components/ProtectedRoute";

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
            <AdminHomePage />
          </ProtectedRoute>
        }
      />
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
