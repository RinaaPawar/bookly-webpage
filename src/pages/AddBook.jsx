import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [genres, setGenres] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const genreArray = genres.split(",").map((g) => g.trim()).filter(Boolean);
      await api.post("/api/books", { title, author, description, coverUrl, genres: genreArray });
      navigate("/");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to add book");
    }
  }

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0 }}>Add a New Book</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        {error && <div style={errorBox}>{error}</div>}
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={input} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} style={input} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={input} />
        <input placeholder="Cover Image URL" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} style={input} />
        <input placeholder="Genres (comma-separated)" value={genres} onChange={(e) => setGenres(e.target.value)} style={input} />
        <button style={btn}>Add Book</button>
      </form>
    </div>
  );
}

const box = {
  background: "white", border: "1px solid #efe7e2", borderRadius: 14, padding: 24, maxWidth: 500, margin: "40px auto"
};
const input = {
  border: "1px solid #e6ddd6", borderRadius: 10, padding: "10px 12px", background: "#fcf9f7", width: "100%"
};
const btn = {
  background: "#8c6f5a", color: "white", border: "none", padding: "10px 12px", borderRadius: 8, cursor: "pointer"
};
const errorBox = {
  background: "#fdecea", color: "#b8563a", padding: "8px 10px", borderRadius: 8, border: "1px solid #f6c7bf"
};
