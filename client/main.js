import { PORT } from "./server.js";
import { firstEndpoint } from "./server.js";

const form = document.getElementById("messageForm");

form.addEventListener("submit", submitButton);

function submitButton(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  fetch(`http://localost:${PORT}/${firstEndpoint}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
}
