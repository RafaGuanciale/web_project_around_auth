import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isLogged } = useContext(AuthContext);

  if (anonymous && isLogged) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLogged) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
