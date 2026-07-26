import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
  <nav>
    <Link to="/" style={{ fontWeight: 700 }}>Notes</Link>
    {isAuthenticated ? (
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </nav>
);
}