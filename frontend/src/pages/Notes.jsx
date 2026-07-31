import { useEffect, useState } from "react";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchNotes = async (searchTerm = "") => {
    const res = await api.get("/notes", {
      params: searchTerm ? { search: searchTerm } : {}
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes().finally(() => setLoading(false));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchNotes(value);
  };

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <NoteForm onCreated={() => fetchNotes(search)} />

      <div style={{ maxWidth: "900px", margin: "0 auto 1.5rem", padding: "0 1.5rem" }}>
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>{search ? "No notes match your search." : "No notes yet. Add one above."}</p>
        ) : (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}