import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthRole, selectAuthToken } from "../features/auth/authSelectors";

function ProtectedRoute({ children, allowedRoles }) {
  const token = useSelector(selectAuthToken);
  const role = useSelector(selectAuthRole);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
