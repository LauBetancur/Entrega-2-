import { obtenerPersonajes, Personaje } from "./detailutils.js";

const mostrarDetallesPersonaje = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const personajes = await obtenerPersonajes();
    
    for (const personaje of personajes) {
        if (personaje.id === id) {
            const imgElement = document.querySelector('.character-image img');
            // Establecer la ruta de la imagen directamente
            imgElement.setAttribute('src', personaje.full_body_image);
            imgElement.setAttribute('alt', personaje.name);

            document.querySelector('.character-name').textContent = personaje.name;
            document.querySelector('.character-occupation').textContent = `Occupation: ${personaje.occupation}`;
            document.querySelector('.character-powers').textContent = `Powers: ${personaje.powers}`;
            document.querySelector('.character-description').textContent = `Description: ${personaje.description}`;
            return; // Salir del bucle una vez que se encuentre el personaje
        }
    }
    
    alert('Character not found!');
};

document.addEventListener("DOMContentLoaded", function () {
    mostrarDetallesPersonaje();
});
