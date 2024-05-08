import { characterById } from "./utils.js";

const render = async () => {
    // Sync ID
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const character = await characterById(id);

    // Set header with character name
    const headTitle = document.querySelector("#headTitle");
    headTitle.textContent = `${character.name} Character`;

    // Character image + div
    const characterDiv = document.querySelector(".character-details");
    const leftDiv = document.createElement("div");
    leftDiv.className = "left-div";
    const img = document.createElement("img");
    img.src = character.full_body_image;
    img.alt = character.name;
    leftDiv.appendChild(img);
    characterDiv.appendChild(leftDiv);

    // Character info + div
    const rightDiv = document.createElement("div");
    rightDiv.className = "right-div";
    characterDiv.appendChild(rightDiv);

    const name = document.createElement('h2');
    name.textContent = character.name;
    rightDiv.appendChild(name);

    const age = document.createElement('p');
    age.textContent = "Age: " + character.age;
    rightDiv.appendChild(age);

    const occupation = document.createElement('p');
    occupation.textContent = "Occupation: " + character.occupation;
    rightDiv.appendChild(occupation);

    const powers = document.createElement('p');
    powers.textContent = "Powers: " + character.powers.join(", ");
    rightDiv.appendChild(powers);

    const description = document.createElement('p');
    description.textContent = "Description: " + character.description;
    rightDiv.appendChild(description);

    const btnBack = document.createElement('button');
    btnBack.textContent = "Back to Characters";
    btnBack.addEventListener("click", () => {
        window.location.href = './Characters.html';
    });
    rightDiv.appendChild(btnBack);
};

document.addEventListener("DOMContentLoaded", render);
