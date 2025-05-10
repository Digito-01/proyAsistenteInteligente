import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
