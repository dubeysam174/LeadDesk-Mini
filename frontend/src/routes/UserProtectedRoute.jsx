import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API, { setAccessToken } from "../api/axios";

const UserProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Get a new Access Token
        const { data } = await API.post("/user/refresh");

        // Save the new Access Token
        setAccessToken(data.accessToken);

        // Verify user
        await API.get("/user/me");

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/user/login" replace />;
};

export default UserProtectedRoute;