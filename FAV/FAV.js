import { obtenerUsuarioEnSesion, obtenerFavoritos,logout } from "../session.js";

document.addEventListener("DOMContentLoaded", () => {
  const renderizarFavoritos = () => {
    const listaFavoritos = document.querySelector('.personajes-lista');
    const usuarioActivo = obtenerUsuarioEnSesion();

    if (!usuarioActivo) {
      window.location.href = "../login.html";
      return;
    }

    const favoritos = obtenerFavoritos();
    if (favoritos.length === 0) {
      const mensajeVacio = document.createElement('h2');
      mensajeVacio.textContent = "No tienes ningún hechizo en tus favoritos.";
      listaFavoritos.appendChild(mensajeVacio);
      return;
    }

    favoritos.forEach(favorito => {
      const elementoFavorito = document.createElement('li');
      elementoFavorito.classList.add('productos__producto');

      const imagenFavorito = document.createElement('img');
      imagenFavorito.src = favorito.image;
      imagenFavorito.alt = favorito.name;

      const nombreFavorito = document.createElement('h3');
      nombreFavorito.textContent = favorito.name;

      elementoFavorito.appendChild(imagenFavorito);
      elementoFavorito.appendChild(nombreFavorito);

      listaFavoritos.appendChild(elementoFavorito);
    });
  };

  renderizarFavoritos();

  document.getElementById('logoutButton').addEventListener('click', () => {
    logout();
    window.location.href = '../index.html';
});

});
