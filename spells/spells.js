import { obtenerHechizos, Spell } from "..//spells/utils-spells.js";
import { obtenerUsuarioEnSesion, agregarFavorito, logout } from "..//session.js";

const renderizarHechizos = async () => {
    const contenedorProductos = document.querySelector('.personajes-lista');
    const hechizos = await obtenerHechizos();
    for (const hechizo of hechizos) {
        const nuevoHechizo = new Spell(hechizo.id, hechizo.name, hechizo.image);
        const elementoHTML = nuevoHechizo.render();

        // Add event listener for the "Add" button
        const addButton = elementoHTML.querySelector('.add-button');
        addButton.addEventListener('click', () => {
          try {
            agregarFavorito({ id: hechizo.id, name: hechizo.name, image: hechizo.image });
            addButton.textContent = "Added";
            addButton.disabled = true;
            alert(`"${hechizo.name}" has been added to your favorites.`);
          } catch (error) {
            alert(error.message);
          }
        });

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
        document.getElementById('logoutButton').addEventListener('click', () => {
          logout();
          window.location.href = '../index.html';
      });
  
    });

});
