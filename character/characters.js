import { obtenerPersonajes } from "./utils.js";

const renderizarPersonajes = async () => {
    const crearTarjetaPersonaje = (personaje) => {
        const productosLista = document.querySelector('.personajes-lista');

        const li = document.createElement('li');
        li.classList.add('productos__producto');

        const link = document.createElement('a');
        link.href = `characterdetails.html?id=${personaje.id}`;

        const img = document.createElement('img');
        img.src = personaje.image;
        img.alt = personaje.name;

        const h2 = document.createElement('h2');
        h2.textContent = personaje.name;

        const label = document.createElement('label');
        label.classList.add('star');
        label.innerHTML = '<i class="far fa-star"></i>';

        // Manejar eventos de favoritos
        label.addEventListener('click', function(event) {
            event.preventDefault(); 
            label.classList.toggle('checked');
            // Aquí puedes agregar lógica para manejar la selección como favorito
            // Por ejemplo, podrías almacenar el ID del personaje en localStorage
        });

        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(label);

        li.appendChild(link);

        productosLista.appendChild(li);
    };

    const personajes = await obtenerPersonajes();
    for (const personaje of personajes) {
        crearTarjetaPersonaje(personaje);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    renderizarPersonajes();
});

