import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import RatingStars from "../components/RatingStars.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  const myReview = useMemo(
    () => reviews.find((r) => r.user?._id === user?.id || r.user === user?.id),
    [reviews, user]
  );

  async function load() {
    const b = await api.get(`/api/books/${id}`).then((r) => r.data);
    const r = await api.get(`/api/reviews/book/${id}`).then((r) => r.data);
    setBook(b);
    setReviews(r);
  }

  useEffect(() => { load(); }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
      <img
        src={book.coverUrl || "https://via.placeholder.com/280x400?text=No+Cover"}
        alt={book.title}
        style={{ width: 280, height: 400, objectFit: "cover", borderRadius: 14, border: "1px solid #efe7e2" }}
      />
      <div>
        <h1 style={{ margin: "6px 0 4px" }}>{book.title}</h1>
        <div style={{ color: "#6b625a", marginBottom: 8 }}>by {book.author}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <RatingStars value={book.averageRating || 0} size={20} />
          <small style={{ color: "#8a7f76" }}>
            {book.averageRating || 0} ({book.reviewCount || 0} reviews)
          </small>
        </div>
        <p style={{ lineHeight: 1.6 }}>{book.description}</p>
        <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(book.genres || []).map((g) => (
            <span key={g} style={{
              background: "#f2e9e3",
              color: "#7a6554",
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12
            }}>{g}</span>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 style={{ color: "#7a6554" }}>Reviews</h3>
          {user && <ReviewEditor
            bookId={id}
            existing={myReview}
            onChange={async () => await load()}
          />}
          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {reviews.map((rv) => (
              <ReviewItem key={rv._id} rv={rv} canEdit={rv.user?._id === user?.id} onChanged={load} />
            ))}
            {reviews.length === 0 && <div style={{ color: "#7a6554" }}>No reviews yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ rv, canEdit, onChanged }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #efe7e2",
      borderRadius: 12,
      padding: 12
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ color: "#6b625a" }}>{rv.user?.name || "User"}</div>
        <RatingStars value={rv.rating} />
      </div>
      <div style={{ whiteSpace: "pre-wrap" }}>{rv.comment}</div>
      {canEdit && (
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button style={btnSecondary} onClick={() => edit(rv, onChanged)}>Edit</button>
          <button style={btnDanger} onClick={() => del(rv._id, onChanged)}>Delete</button>
        </div>
      )}
    </div>
  );
}

async function edit(rv, onChanged) {
  const rating = Number(prompt("New rating (1-5):", rv.rating));
  if (!rating || rating < 1 || rating > 5) return;
  const comment = prompt("New comment:", rv.comment ?? "") ?? "";
  await import("../api/axios").then(({ default: api }) =>
    api.put(`/api/reviews/${rv._id}`, { rating, comment })
  );
  await onChanged();
}

async function del(id, onChanged) {
  if (!confirm("Delete this review?")) return;
  await import("../api/axios").then(({ default: api }) =>
    api.delete(`/api/reviews/${id}`)
  );
  await onChanged();
}

function ReviewEditor({ bookId, existing, onChange }) {
  const [rating, setRating] = useState(existing?.rating || 0);
  const [comment, setComment] = useState(existing?.comment || "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setRating(existing?.rating || 0);
    setComment(existing?.comment || "");
  }, [existing]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (existing) {
        await import("../api/axios").then(({ default: api }) =>
          api.put(`/api/reviews/${existing._id}`, { rating, comment })
        );
      } else {
        await import("../api/axios").then(({ default: api }) =>
          api.post(`/api/reviews/${bookId}`, { rating, comment })
        );
      }
      await onChange();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} style={{
      background: "white", border: "1px solid #efe7e2", borderRadius: 12, padding: 12, marginBottom: 12
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <RatingStars value={rating} onChange={setRating} editable />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={existing ? "Update your comment" : "Share your thoughts"}
          style={input}
        />
        <button disabled={busy || rating < 1} style={btnPrimary}>
          {existing ? "Update" : "Post"}
        </button>
      </div>
    </form>
  );
}

const btnPrimary = {
  background: "#8c6f5a", color: "white", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer"
};
const btnSecondary = {
  background: "#f2e9e3", color: "#7a6554", border: "1px solid #e6ddd6", padding: "6px 10px", borderRadius: 8, cursor: "pointer"
};
const btnDanger = {
  background: "#b8563a", color: "white", border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer"
};
const input = {
  flex: 1, border: "1px solid #e6ddd6", borderRadius: 10, padding: "8px 10px", background: "#fcf9f7"
};
