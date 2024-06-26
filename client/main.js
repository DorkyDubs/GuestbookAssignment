const form = document.getElementById("messageForm");

async function fetchAndRenderList() {
  const response = await fetch(
    `https://guestbookassignment-client.onrender.com/pets`
  ); // want server url on render
  const ourList = await response.json();
  const listDiv = document.getElementById("display");
  listDiv.innerHTML = "";
  ourList.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<p> ID: ${item.id}, Name ${item.name}, Grade: ${item.grade}, Type of Animal: ${item.type_of_animal}, Starsign: ${item.starsign}</p>`;
    listDiv.appendChild(itemDiv);
  });
}
fetchAndRenderList();
form.addEventListener("submit", submitButton);

async function submitButton(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  try {
    const response = await fetch(
      `https://guestbookassignment-client.onrender.com/pets`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("Data saved - nice one");
      fetchAndRenderList();
    } else {
      console.log(" fluffed it");
    }
  } catch (error) {
    console.log("erroneous", error);
  }
}
