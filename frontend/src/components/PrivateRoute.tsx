import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { loading, isAuthenticated } = useContext(AuthContext);

  // While the AuthProvider is checking/refreshing tokens, show a loading state
  if (loading) {
    return <div className="p-8">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    // Not authenticated -> redirect to login
    return <Navigate to="/login" replace />;
  }

  // Authenticated -> render the page
  return children;
};
