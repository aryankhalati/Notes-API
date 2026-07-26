import { Link } from "react-router-dom";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content?.slice(0, 100)}{note.content?.length > 100 ? "..." : ""}</p>
      <Link to={`/notes/${note._id}`}>View</Link>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  );
}