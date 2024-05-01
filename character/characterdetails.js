import { obtenerPersonajes } from "./utils.js";

const mostrarDetallesPersonaje = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    const personajes = await obtenerPersonajes();
    const personaje = personajes.find(p => p.id === id);

    if (personaje) {
        // Establecer la ruta de la imagen directamente en la etiqueta img
        const imgElement = document.querySelector('.character-image img');
        imgElement.src = personaje.full_body_image;
        imgElement.alt = personaje.name;

        document.querySelector('.character-name').textContent = personaje.name;
        document.querySelector('.character-occupation').textContent = `Occupation: ${personaje.occupation}`;
        document.querySelector('.character-powers').textContent = `powers: ${personaje.powers}`;
        document.querySelector('.character-description').textContent = `Description: ${personaje.description}`;
    } else {
        alert('Character not found!');
    }
};

document.addEventListener("DOMContentLoaded", function() {
    mostrarDetallesPersonaje();
});
