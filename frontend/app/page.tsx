"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<{ _id: number; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

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
  /*const addNote = async () => {
    if (!input.trim()) return;

    await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    setInput("");
    fetchNotes(); // refresh notes after adding
  };
  */
  // ------------------------
  // 🔹 Edit note function
  // ------------------------
  const addNote = async () => {
    // console.log("Editing ID:", editingId); //for testing purposes
  if (!input.trim()) return;

  if (editingId /* !== null */) {
    // 🔹 UPDATE mode
    await fetch(`http://localhost:5000/notes/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ /* id: editingId,*/ text: input }),
    });

    setEditingId(null); // exit edit mode
  } else {
    // 🔹 ADD mode
    await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
  }

  setInput("");
  fetchNotes();
};

  // ------------------------
  // 🔹 Delete note function (NEW)
  // ------------------------
  const deleteNote = async (_id: number) => {
    await fetch(`http://localhost:5000/notes/${_id}`, {
      method: "DELETE",
      /* headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }) */
    });

    fetchNotes(); // refresh notes after deleting
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-black-100">
      <h1 className="text-3xl font-bold mb-4">Notes App</h1>

      {/* Input */}
      <div className="flex gap-2 mb-4">
  <input
    type="text"
    value={input}
    onChange={e => setInput(e.target.value)}
    placeholder="Enter note..."
    className="border p-2 rounded w-64"
  />
     <button
       onClick={addNote}
       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
       {editingId ? "Update" : "Add"}
     </button>
    </div>

      {/* Notes list */}
      <ul className="w-full max-w-md">
  {notes.length === 0 ? (
    <p className="text-gray-500 text-center">No notes yet</p>
  ) : (
    notes.map((note) => (
      <li
        key={note._id}
        className="flex justify-between items-center bg-black p-3 mb-2 rounded shadow"
      >
        <span>{note.text}</span>

        <button
        onClick={() => {
          setInput(note.text);      // fill input
          setEditingId(note._id);    // set edit mode
        }}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
        Edit
        </button>

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