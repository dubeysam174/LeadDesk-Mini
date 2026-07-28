import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LeadDesk Mini
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <Link
            to="/"
            className={`font-medium transition ${
              pathname === "/"
                ? "text-blue-600"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <a
            href="#lead-form"
            className="font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Get Started
          </a>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Admin Login
          </Link>
          <Link
            to="/user/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            user Login
          </Link>
          

        </nav>
      </div>
    </header>
  );
};

export default Navbar;