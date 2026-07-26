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

  if (notFound) return <p>Note not found. <Link to="/">Go back</Link></p>;
  if (!note) return <p>Loading...</p>;

  return editing ? (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  ) : (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <Link to="/">Back</Link>
    </div>
  );
}