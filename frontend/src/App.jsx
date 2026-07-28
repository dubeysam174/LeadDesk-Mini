import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboad from "./pages/UserDashboad";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";

import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserProtectedRoute from "./routes/UserProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/login" element={<UserLogin />} />

      <Route path="/userdashboard" element={<UserProtectedRoute><UserDashboad /></UserProtectedRoute>} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
