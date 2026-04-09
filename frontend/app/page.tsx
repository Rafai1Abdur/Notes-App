"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // ------------------------
  // 🔹 State variables
  // ------------------------
  // notes = list of notes fetched from backend
  // _id is string because MongoDB IDs are strings
  const [notes, setNotes] = useState<{ _id: string; text: string }[]>([]);
  const [input, setInput] = useState(""); // input box text
  const [editingId, setEditingId] = useState<string | null>(null); // currently editing note ID

  // ------------------------
  // 🔹 Fetch notes from backend
  // ------------------------
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/notes"); // GET all notes
      const data = await res.json();
      setNotes(data); // update notes state
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // run fetchNotes once when page loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // ------------------------
  // 🔹 Add or Edit a note
  // ------------------------
  const addNote = async () => {
    if (!input.trim()) return; // ignore empty input

    if (editingId) {
      // 🔹 EDIT mode
      try {
        await fetch(`http://localhost:5000/notes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input }), // send only text, ID is in URL
        });
        setEditingId(null); // exit edit mode
      } catch (err) {
        console.error("Error updating note:", err);
      }
    } else {
      // 🔹 ADD mode
      try {
        await fetch("http://localhost:5000/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input }),
        });
      } catch (err) {
        console.error("Error adding note:", err);
      }
    }

    setInput(""); // clear input box
    fetchNotes(); // reload notes
  };

  // ------------------------
  // 🔹 Delete a note
  // ------------------------
  const deleteNote = async (_id: string) => {
    try {
      await fetch(`http://localhost:5000/notes/${_id}`, {
        method: "DELETE",
      });
      fetchNotes(); // reload notes after deleting
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // ------------------------
  // 🔹 Render
  // ------------------------
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-black-100">
      <h1 className="text-3xl font-bold mb-4">Notes App</h1>

      {/* Input box + Add/Update button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter note..."
          className="border p-2 rounded w-64"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update" : "Add"} {/* change button text based on mode */}
        </button>
      </div>

      {/* Notes list */}
      <ul className="w-full max-w-md">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes yet</p>
        ) : (
          notes.map((note) => (
            <li
              key={note._id} // use MongoDB _id as React key
              className="flex justify-between items-center bg-black p-3 mb-2 rounded shadow"
            >
              <span>{note.text}</span>

              {/* Edit button */}
              <button
                onClick={() => {
                  setInput(note.text); // fill input box
                  setEditingId(note._id); // tell app which note we are editing
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              {/* Delete button */}
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}