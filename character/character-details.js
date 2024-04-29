import { obtenerPersonajePorId } from "./utils.js";

const cargarDetallesPersonaje = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        console.error('No se proporcionó un ID de personaje.');
        return;
    }

    const personaje = await obtenerPersonajePorId(id);

    if (!personaje) {
        console.error('No se encontró el personaje con el ID proporcionado.');
        return;
    }

    document.getElementById('character-name').textContent = personaje.name;
    document.getElementById('character-age').textContent = personaje.age;
    document.getElementById('character-occupation').textContent = personaje.occupation;
    document.getElementById('character-powers').textContent = personaje.powers.join(', ');
    document.getElementById('character-description').textContent = personaje.description;

    const characterImage = document.querySelector('.character-image img');
    characterImage.src = personaje.image;
    characterImage.alt = personaje.name;

    const fullBodyImage = document.querySelector('.full-body-image img');
    fullBodyImage.src = personaje.full
