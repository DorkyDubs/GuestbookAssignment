import { PORT } from "./server.js";
import { firstEndpoint } from "./server.js";

const form = document.getElementById("messageForm");

async function fetchAndRenderList() {
  const response = await fetch(`http://localhost:${PORT}/pets`); // want server url on render
  const ourList = await response.json();
  const listDiv = document.getElementById("app");
  listDiv.innerHTML = "";
  ourList.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<p> ID: ${item.id}, Name ${item.name}, Location ${item.location}</p>`;
    listDiv.appendChild(itemDiv);
  });
}

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
