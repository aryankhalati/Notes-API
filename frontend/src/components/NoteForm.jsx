import { useState } from "react";
import api from "../api/axios";

export default function NoteForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/notes", { title, content });
      setTitle("");
      setContent("");
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Write a note..." value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Add Note</button>
    </form>
  );
}