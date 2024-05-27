import { obtenerHechizos, Spell } from "./utils-spells.js";
import { obtenerUsuarioEnSesion, logout } from "..//session.js";

const renderizarHechizos = async () => {
    const contenedorProductos = document.querySelector('.personajes-lista');

    const hechizos = await obtenerHechizos();
    for (const hechizo of hechizos) {
        const nuevoHechizo = new Spell(hechizo.id, hechizo.name, hechizo.image);
        const elementoHTML = nuevoHechizo.render();
        contenedorProductos.appendChild(elementoHTML);
    }
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
      window.location.href = "..//login.html";
      return;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarHechizos();

    const barraBusqueda = document.querySelector('.search-bar input');

    barraBusqueda.addEventListener('input', () => {
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

    const gestionarAutenticacion = () => {
        const authButton = document.getElementById("auth-button");
        const usuarioEnSesion = obtenerUsuarioEnSesion();
      
        if (usuarioEnSesion) {
          authButton.innerHTML = '<button type="button" class="log-out">Cerrar sesión</button>';
          authButton.querySelector("button").addEventListener("click", () => {
            logout();
            window.location.href = "..//index.html";
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
