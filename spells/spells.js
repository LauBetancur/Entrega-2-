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

document.addEventListener('DOMContentLoaded', () => {
    const barraBusqueda = document.querySelector('.search-bar input');
    console.log(barraBusqueda); 

    barraBusqueda.addEventListener('input', () => {
        console.log('Input detectado'); 
        const textoBusqueda = barraBusqueda.value.toLowerCase();
        const hechizos = document.querySelectorAll('.productos__producto');

        hechizos.forEach(hechizo => {
            const nombreHechizo = hechizo.querySelector('h2').textContent.toLowerCase();
            if (nombreHechizo.includes(textoBusqueda)) {
                hechizo.style.display = 'block';
            } else {
                hechizo.style.display = 'none';
            }
        });
    });
});