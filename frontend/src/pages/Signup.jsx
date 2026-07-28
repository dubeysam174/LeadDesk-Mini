import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

import API from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/user/register", formData);

      toast.success(data.message || "Registration Successful");

      navigate("/user/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-900">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Sign up to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;