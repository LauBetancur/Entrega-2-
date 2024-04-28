import { obtenerPersonajes } from "./utils.js";

const renderizarPersonajes = async () => {
    const crearTarjetaPersonaje = (nombre, imagen, detalleUrl) => {
        const productosLista = document.querySelector('.personajes-lista');

        const li = document.createElement('li');
        li.classList.add('productos__producto');

        const link = document.createElement('a');
        link.href = detalleUrl;

        const img = document.createElement('img');
        img.src = imagen;

        const h2 = document.createElement('h2');
        h2.textContent = nombre;

        const label = document.createElement('label');
        label.classList.add('star');
        label.innerHTML = '<i class="far fa-star"></i>';

    // aca manejamos eventos 
        label.addEventListener('click', function(event) {
            event.preventDefault(); 
            label.classList.toggle('checked');
        });

        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(label);

        li.appendChild(link);

        productosLista.appendChild(li);
    };

    const personajes = await obtenerPersonajes();
    for (const personaje of personajes) {
        crearTarjetaPersonaje(personaje.name, personaje.image);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    renderizarPersonajes();
});
