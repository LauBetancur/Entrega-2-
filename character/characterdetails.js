import { obtenerPersonajes, Personaje } from "./detailutils.js";

const mostrarDetallesPersonaje = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const personajes = await obtenerPersonajes();
    const personaje = personajes.find(p => p.id === id);
    if (personaje) {
        const imgElement = document.querySelector('.character-image img');
        // Establecer la ruta de la imagen directamente
        imgElement.setAttribute('src', personaje.full_body_image);
        imgElement.setAttribute('alt', personaje.name);

        document.querySelector('.character-name').textContent = personaje.name;
        document.querySelector('.character-occupation').textContent = `Occupation: ${personaje.occupation}`;
        document.querySelector('.character-powers').textContent = `Powers: ${personaje.powers}`;
        document.querySelector('.character-description').textContent = `Description: ${personaje.description}`;
    } else {
        alert('Character not found!');
    }
};

document.addEventListener("DOMContentLoaded", function () {
    mostrarDetallesPersonaje();
});
