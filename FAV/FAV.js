import { obtenerFavoritos } from "../session.js";
import { Favoritos } from "./utils-FAV.js";
import { Spell } from "../spells/utils-spells.js";

const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
      window.location.href = "..//login.";
      return;
    }
export const renderizarFavoritos = async () => {
    const favoritos = await obtenerFavoritos();
    const campo1 = document.querySelector('.personajes-lista');

    favoritos.forEach(favorito => {
        const nuevoFavorito = new Favoritos(favorito.id, favorito.img, favorito.name, favorito.price);
        const elementoHTML = nuevoFavorito.render();
        campo1.appendChild(elementoHTML);
    });
};
