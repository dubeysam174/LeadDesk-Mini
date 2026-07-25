import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await API.post("/auth/logout");

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          LeadDesk Mini
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </header>
  );
};

export default DashboardNavbar;