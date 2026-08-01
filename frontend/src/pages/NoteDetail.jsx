import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/notes/${id}`)
      .then((res) => {
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true);
      });
  }, [id]);

  const handleUpdate = async () => {
    setError("");
    try {
      const res = await api.put(`/notes/${id}`, { title, content });
      setNote(res.data);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update note");
    }
  };

  const handleDelete = async () => {
    await api.delete(`/notes/${id}`);
    navigate("/");
  };

  if (notFound) return <p className="page-message">Note not found. <Link to="/">Go back</Link></p>;
  if (!note) return <p className="page-message">Loading...</p>;

  return (
    <div className="note-detail">
      {editing ? (
        <>
          {error && <p className="form-error">{error}</p>}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ marginTop: "0.75rem", minHeight: "140px" }} />
          <div className="note-detail-actions">
            <button onClick={handleUpdate}>Save</button>
            <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div className="note-detail-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button className="btn-danger" onClick={handleDelete}>Delete</button>
          </div>
          <div>
            <Link to="/" className="back-link">← Back to notes</Link>
          </div>
        </>
      )}
    </div>
  );
}