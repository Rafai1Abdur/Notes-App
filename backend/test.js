// test.js

// POST request
fetch("http://localhost:5000/notes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "My first note from Node CLI" }),
})
  .then(res => res.json())
  .then(data => {
    console.log("POST Response:", data);

    // GET request after POST
    return fetch("http://localhost:5000/notes");
  })
  .then(res => res.json())
  .then(data => {
    console.log("GET Response:", data);
  })
  .catch(err => console.error("Error:", err));