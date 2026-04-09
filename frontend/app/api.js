const API_URL = "http://localhost:5000"; // backend

export const fetchNotes = async () => {
  const res = await fetch(`${API_URL}/notes`);
  return res.json();
};

export const addNote = async (note) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
};

export const updateNote = async (id, note) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });
  return res.json();
};