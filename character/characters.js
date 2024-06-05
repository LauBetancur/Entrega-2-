import { obtenerPersonajes, Personaje } from "./utils.js";
import { obtenerUsuarioEnSesion, agregarFavorito, logout } from "../session.js";

const renderizarPersonajes = async () => {
  const contenedorProductos = document.querySelector('.personajes-lista');
  const personajes = await obtenerPersonajes();

  personajes.forEach(personaje => {
    const nuevoPersonaje = new Personaje(personaje.id, personaje.name, personaje.image);
    const elementoHTML = nuevoPersonaje.render();

    // Add event listener for the "Add" button
    const addButton = elementoHTML.querySelector('.add-button');
    addButton.addEventListener('click', () => {
      try {
        agregarFavorito({ id: personaje.id, name: personaje.name, image: personaje.image });
        addButton.textContent = "Added";
        addButton.disabled = true;
        alert(`"${personaje.name}" has been added to your favorites.`);
      } catch (error) {
        alert(error.message);
      }
    });

    contenedorProductos.appendChild(elementoHTML);
  });

  const usuarioActivo = obtenerUsuarioEnSesion();
  if (!usuarioActivo) {
    window.location.href = "../login.html";
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
    document.getElementById('logoutButton').addEventListener('click', () => {
      logout();
      window.location.href = '../index.html';
  });

  });

  
});
