import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import AddBook from "./pages/AddBook.jsx";



const appStyle = {
  fontFamily: "Inter, system-ui, Arial, sans-serif",
  backgroundColor: "#f7f2ee",
  minHeight: "100vh",
  color: "#3d3a35"
};

export default function App() {
  return (
    <div style={appStyle}>
      <Nav />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<AuthGate guestOnly><Login /></AuthGate>} />
          <Route path="/signup" element={<AuthGate guestOnly><Signup /></AuthGate>} />
          <Route path="/add-book" element={<AuthGate><AddBook /></AuthGate>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function AuthGate({ children, guestOnly = false }) {
  const { user } = useAuth();
  if (guestOnly && user) return <Navigate to="/" replace />;
  return children;
}
