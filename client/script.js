// Fetch all existing events on page load
fetch("http://localhost:5000/events")
  .then(response => response.json())
  .then(events => {
    events.forEach(renderEvent);
  });

// Handle new event form submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const title = titleInput.value.trim();
  
  if (!title) {
    return; // Do not submit empty title
  }
  
  fetch("http://localhost:5000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
    .then(response => response.json())
    .then(event => {
      renderEvent(event);
      titleInput.value = ""; // Clear input field after successful submission
    });
});

// Render an event item in the list
function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  document.querySelector("#event-list").appendChild(li);
}
