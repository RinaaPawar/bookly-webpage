import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const bar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 24px",
  borderBottom: "1px solid #e6ddd6",
  backgroundColor: "#f9f5f2",
  position: "sticky",
  top: 0,
  zIndex: 10
};

const brand = { fontWeight: 700, color: "#8c6f5a", textDecoration: "none", fontSize: 20 };
const link = { color: "#3d3a35", textDecoration: "none", marginLeft: 16 };
const btn = {
  background: "#8c6f5a",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
  marginLeft: 12
};

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={bar}>
      <Link to="/" style={brand}>Bookly</Link>
      <div>
        {!user ? (
          <>
            <Link to="/login" style={link}>Login</Link>
            <Link to="/signup" style={link}>Signup</Link>
          </>
        ) : (
          <>
  <span style={{ color: "#6b625a" }}>Hi, {user.name}</span>
  <Link to="/add-book" style={link}>+ Add Book</Link>
  <button style={btn} onClick={() => { logout(); navigate("/"); }}>Logout</button>
</>


        )}
      </div>
    </nav>
  );
}
