"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<{ text: string }[]>([]);
  const [input, setInput] = useState("");

  // ------------------------
  // 🔹 Fetch notes from backend
  // ------------------------
  const fetchNotes = async () => {          // ADD THIS FUNCTION after useState declarations
    const res = await fetch("http://localhost:5000/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes(); // call fetchNotes on page load
  }, []);

  // ------------------------
  // 🔹 Add note function (already exists)
  // ------------------------
  const addNote = async () => {
    if (!input) return;

    await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    setInput("");
    fetchNotes(); // refresh notes after adding
  };

  // ------------------------
  // 🔹 Delete note function (NEW)
  // ------------------------
  const deleteNote = async (text: string) => {
    await fetch("http://localhost:5000/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    fetchNotes(); // refresh notes after deleting
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter note..."
      />
      <button onClick={addNote}>Add Note</button>

      {/* Notes list */}
      <ul>
        {notes.map((note, index) => (
          // ------------------------
          // 🔹 Add Delete button next to each note (CHANGE THIS LINE)
          // ------------------------
          <li key={index}>
            {note.text}{" "}
            <button onClick={() => deleteNote(note.text)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}