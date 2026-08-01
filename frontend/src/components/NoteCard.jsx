import { Link } from "react-router-dom";

export default function NoteCard({ note, onDelete }) {
  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="note-card">
      <span className="note-tag">{note.title?.[0]?.toUpperCase() || "?"}</span>
      <h3>{note.title}</h3>
      <p>{note.content?.slice(0, 100)}{note.content?.length > 100 ? "..." : ""}</p>
      {formattedDate && <span className="note-meta">{formattedDate}</span>}
      <div className="note-card-footer">
        <Link to={`/notes/${note._id}`}>View note →</Link>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}