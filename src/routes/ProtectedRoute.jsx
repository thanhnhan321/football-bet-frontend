import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthRole,
  selectAuthToken,
} from "../features/auth/authSelectors";
import { isTokenExpired } from "../features/auth/tokenUtils";

function ProtectedRoute({ children, allowedRoles }) {
  const token = useSelector(selectAuthToken);
  const role = useSelector(selectAuthRole);
  const tokenExpired = token ? isTokenExpired(token) : false;

  if (!token || tokenExpired) {
    const loginPath = tokenExpired ? "/login?reason=session_expired" : "/login";
    return <Navigate to={loginPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
