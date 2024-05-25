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

document.addEventListener('DOMContentLoaded', () => {
    const barraBusqueda = document.querySelector('.search-bar input');
    console.log(barraBusqueda); 

    barraBusqueda.addEventListener('input', () => {
        console.log('Input detectado'); 
        const textoBusqueda = barraBusqueda.value.toLowerCase();
        const personajes = document.querySelectorAll('.productos__producto');

        personajes.forEach(personaje => {
            const nombrepersonaje = personaje.querySelector('h2').textContent.toLowerCase();
            if (nombrepersonaje.includes(textoBusqueda)) {
                personaje.style.display = 'block';
            } else {
                personaje.style.display = 'none';
            }
        });
    });
});