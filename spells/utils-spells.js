import { obtenerUsuarioEnSesion, agregarFavorito } from "../session.js"

export const obtenerHechizos = async () => {
    const response = await fetch("spells.json");
    const data = await response.json();
    return data;
};

export class Spell {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    };

    render() {
        const producto = document.createElement("li");
        producto.classList.add("productos__producto");

        const link = document.createElement("a");
        link.href = `spellsdetail.html?id=${this.id}`;

        const img = document.createElement("img");
        img.src = this.image;
        img.alt = this.name;

        const h2 = document.createElement("h2");
        h2.textContent = this.name;

        const label = document.createElement("label");
        label.classList.add("star");
        label.innerHTML = '<i class="far fa-star"></i>';

        label.addEventListener('click', function (event) {
            event.preventDefault();
            label.classList.toggle('checked');
            agregarFavorito(this.id);
        
        });

        const usuarioActivo = obtenerUsuarioEnSesion();
        if (usuarioActivo && usuarioActivo.favoritos.includes(this.id)) {
          label.classList.add('checked');
        }

        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(label);

        producto.appendChild(link);
        return producto;
    };
}

