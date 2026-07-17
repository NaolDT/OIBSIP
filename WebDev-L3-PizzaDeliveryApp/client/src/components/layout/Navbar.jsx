import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-white border-b border-muted/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={isAdmin ? "/admin/inventory" : "/dashboard"} className="text-xl font-extrabold text-brand">
            🍕 PizzaHub
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin/inventory" className="text-charcoal hover:text-brand font-medium">
                      Inventory
                    </Link>
                    <Link to="/admin/orders" className="text-charcoal hover:text-brand font-medium">
                      Orders
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-charcoal hover:text-brand font-medium">
                      Dashboard
                    </Link>
                    <Link to="/my-orders" className="text-charcoal hover:text-brand font-medium">
                      My Orders
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-brand text-white font-semibold hover:bg-brand-dark transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-charcoal hover:text-brand font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-brand text-white font-semibold hover:bg-brand-dark transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-charcoal"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {user ? (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin/inventory" onClick={() => setMenuOpen(false)} className="text-charcoal font-medium">
                      Inventory
                    </Link>
                    <Link to="/admin/orders" onClick={() => setMenuOpen(false)} className="text-charcoal font-medium">
                      Orders
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-charcoal font-medium">
                      Dashboard
                    </Link>
                    <Link to="/my-orders" onClick={() => setMenuOpen(false)} className="text-charcoal font-medium">
                      My Orders
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-brand text-white font-semibold text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-charcoal font-medium">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="text-brand font-semibold">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;