
import { obtenerHechizos, Spell } from "./utilsdetail.js";

const mostrarDetallesHechizo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const hechizos = await obtenerHechizos();
    
    for (const hechizo of hechizos) {
        if (hechizo.id === id) {
            const imgElement = document.querySelector('.spell-image img');
            imgElement.setAttribute('src', hechizo.image);
            imgElement.setAttribute('alt', hechizo.name);

            document.querySelector('.spell-name').textContent = hechizo.name;
            document.querySelector('.spell-description').textContent = hechizo.description;
            return;
        }
    }
    
    alert('Spell not found!');
};

document.addEventListener("DOMContentLoaded", function () {
    mostrarDetallesHechizo();
});
