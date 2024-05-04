import { obtenerHechizos, Spell } from "./utils-spells.js";

const renderizarHechizos = async () => {
    const contenedorProductos = document.querySelector('.personajes-lista');

    const hechizos = await obtenerHechizos();
    for (const hechizo of hechizos) {
        const nuevoHechizo = new Spell(hechizo.id, hechizo.name, hechizo.image);
        const elementoHTML = nuevoHechizo.render();
        contenedorProductos.appendChild(elementoHTML);
    }
};

document.addEventListener("DOMContentLoaded", renderizarHechizos);
