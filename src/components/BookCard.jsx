import { Link } from "react-router-dom";
import RatingStars from "./RatingStars.jsx";

const card = {
  background: "white",
  border: "1px solid #efe7e2",
  borderRadius: 14,
  padding: 16,
  display: "flex",
  gap: 14,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
};

export default function BookCard({ book }) {
  return (
    <div style={card}>
      <img
        src={book.coverUrl || "https://via.placeholder.com/80x120?text=No+Cover"}
        alt={book.title}
        width={80}
        height={120}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        <Link to={`/books/${book._id}`} style={{ textDecoration: "none", color: "#3d3a35" }}>
          <h3 style={{ margin: "4px 0 6px 0" }}>{book.title}</h3>
        </Link>
        <div style={{ color: "#6b625a", fontSize: 14, marginBottom: 6 }}>by {book.author}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RatingStars value={book.averageRating || 0} />
          <small style={{ color: "#8a7f76" }}>({book.reviewCount || 0})</small>
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(book.genres || []).slice(0, 3).map((g) => (
            <span key={g} style={{
              background: "#f2e9e3",
              color: "#7a6554",
              padding: "2px 8px",
              borderRadius: 999,
              fontSize: 12
            }}>{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
