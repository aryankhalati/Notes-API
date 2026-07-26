import { useEffect, useState } from "react";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes().finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <NoteForm onCreated={fetchNotes} />
      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>No notes yet. Add one above.</p>
        ) : (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}