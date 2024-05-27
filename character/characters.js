import { obtenerPersonajes, Personaje } from "./utils.js";
import { obtenerUsuarioEnSesion, logout } from "./session.js";

const renderizarPersonajes = async () => {
    const contenedorProductos = document.querySelector('.personajes-lista');

    const personajes = await obtenerPersonajes();
    for (const personaje of personajes) {
        const nuevoPersonaje = new Personaje(personaje.id, personaje.name, personaje.image);
        const elementoHTML = nuevoPersonaje.render();
        contenedorProductos.appendChild(elementoHTML);
    }

    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
      window.location.href = "./login.html";
      return;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarPersonajes();

    const barraBusqueda = document.querySelector('.search-bar input');

    barraBusqueda.addEventListener('input', () => {
        const textoBusqueda = barraBusqueda.value.toLowerCase();
        const personajes = document.querySelectorAll('.productos__producto');

        personajes.forEach(personaje => {
            const nombrePersonaje = personaje.querySelector('h2').textContent.toLowerCase();
            if (nombrePersonaje.includes(textoBusqueda)) {
                personaje.style.display = 'block';
            } else {
                personaje.style.display = 'none';
            }
        });
    });

    const gestionarAutenticacion = () => {
        const authButton = document.getElementById("auth-button");
        const usuarioEnSesion = obtenerUsuarioEnSesion();
      
        if (usuarioEnSesion) {
          authButton.innerHTML = '<button type="button" class="log-out">Cerrar sesión</button>';
          authButton.querySelector("button").addEventListener("click", () => {
            logout();
            window.location.href = "index.html";
          });
        } else {
          authButton.innerHTML = '<a href="log-in/login.html"><button type="button" class="log-in">Iniciar sesión</button></a>';
        }
    };

    gestionarAutenticacion();
});

window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('paginaReiniciada');
});
