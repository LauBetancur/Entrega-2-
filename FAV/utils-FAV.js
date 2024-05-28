import { obtenerFavoritos } from "../session.js";

export class Favoritos {
    constructor(id, img, name, price) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.price = price;
    }

    render() {
        const block = document.createElement('div');
        block.classList.add('block');

        const block__innerblocks = document.createElement('div');
        block__innerblocks.classList.add('block__innerblocks');
        block.appendChild(block__innerblocks);

        const imgBlockInnerblocks = document.createElement('img');
        imgBlockInnerblocks.src = this.img;
        imgBlockInnerblocks.alt = this.name;
        block__innerblocks.appendChild(imgBlockInnerblocks);

        const bottomblock = document.createElement('div');
        bottomblock.classList.add('block__bottomblock');

        const title = document.createElement('p');
        title.classList.add('block__bottomblock--letras');
        title.textContent = this.name;
        bottomblock.appendChild(title);

        const button = document.createElement('button');
        button.textContent = 'More';
        button.classList.add('more');
        bottomblock.appendChild(button);

        block.appendChild(bottomblock);

        button.addEventListener('click', () => {
            window.location.href = '../Description-page/description.html?id=' + this.id;
        });

        return block;
    }
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
