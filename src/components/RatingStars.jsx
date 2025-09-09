export default function RatingStars({ value = 0, onChange, size = 18, editable = false }) {
  const stars = [1, 2, 3, 4, 5];
  const color = "#c19a7f";
  const off = "#d9c8bc";

  return (
    <div>
      {stars.map((s) => (
        <span
          key={s}
          onClick={editable ? () => onChange?.(s) : undefined}
          style={{
            cursor: editable ? "pointer" : "default",
            color: s <= value ? color : off,
            fontSize: size,
            marginRight: 2
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
