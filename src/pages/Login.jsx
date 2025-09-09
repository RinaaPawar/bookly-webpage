import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      login(data.token, data.user);
      navigate("/", { replace: true });
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  }

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0 }}>Welcome back</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        {err && <div style={error}>{err}</div>}
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={input} />
        <button style={btn}>Login</button>
      </form>
      <div style={{ marginTop: 12, color: "#6b625a" }}>
        New here? <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
}

const box = {
  background: "white", border: "1px solid #efe7e2", borderRadius: 14, padding: 24, maxWidth: 420, margin: "40px auto"
};
const input = {
  border: "1px solid #e6ddd6", borderRadius: 10, padding: "10px 12px", background: "#fcf9f7"
};
const btn = {
  background: "#8c6f5a", color: "white", border: "none", padding: "10px 12px", borderRadius: 8, cursor: "pointer"
};
const error = {
  background: "#fdecea", color: "#b8563a", padding: "8px 10px", borderRadius: 8, border: "1px solid #f6c7bf"
};
