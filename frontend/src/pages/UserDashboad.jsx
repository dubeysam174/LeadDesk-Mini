import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API, { clearAccessToken } from "../api/axios";

const UserDashboad = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await API.get("/user/me");
      setUser(data.user);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load user"
      );
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/user/logout");

      clearAccessToken();

      toast.success("Logged out successfully");

      navigate("/user/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6">
          User Dashboard
        </h1>

        {user ? (
          <>
            <div className="space-y-3 mb-8">

              <p>
                <span className="font-semibold">ID:</span> {user.id}
              </p>

              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>
  );
};

export default UserDashboad;