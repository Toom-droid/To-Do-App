import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();
  if(loading && !isAuthenticated) return <h1>Loading...</h1>
  if (!loading && !isAuthenticated) return <Navigate to="login" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
