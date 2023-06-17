let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


const toyCollection = document.getElementById("toy-collection");
fetch(`http://localhost:3000/toys`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((card) => addCard(card));
  });

function addCard(cardList) {
  const h2 = document.createElement("h2");
  h2.innerText = cardList.name;

  const img = document.createElement("img");
  img.classList.add("toy-avatar");
  img.src = cardList.image;

  const p = document.createElement("p");
  p.innerText = cardList.likes;

  const button = document.createElement("button");
  button.classList.add("like-btn");
  button.id = cardList.id;
  button.type = "button";
  // console.log(button.type);
  button.addEventListener("click", (e) => {
    cardList.likes++;
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: cardList.likes,
      }),
    };

    fetch(`http://localhost:3000/toys/${button.id}`, configObject)
    .then((res) => res.json())
    .then((data) => console.log(data));
    e.preventDefault();

  });

  button.innerText = "Like ❤️";

  const card = document.createElement("div");
  card.classList.add("card");
  card.append(h2, img, p, button);
  toyCollection.append(card);
}

const newToyBtn = document.querySelector("form");
newToyBtn.addEventListener("submit", (e) => {
  e.preventDefault();

  const toyData = {
    name: document.querySelector("input[name=name]").value,
    image: document.querySelector("input[name=image]").value,
    likes: "0",
  };

  const configObject = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyData),
  };

  fetch(`http://localhost:3000/toys`, configObject)
    .then((res) => res.json())
    .then((data) => addCard(data));
});
});