import { obtenerPersonajes, Personaje } from "./utils.js";

const renderizarPersonajes = async () => {
    const contenedorProductos = document.querySelector('.personajes-lista');

    const personajes = await obtenerPersonajes();
    for (const personaje of personajes) {
        const nuevoPersonaje = new Personaje(personaje.id, personaje.name, personaje.image);
        const elementoHTML = nuevoPersonaje.render();
        contenedorProductos.appendChild(elementoHTML);
    }
};

document.addEventListener("DOMContentLoaded", renderizarPersonajes);

