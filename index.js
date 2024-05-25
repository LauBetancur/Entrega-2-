import { obtenerHechizos, Spell } from "./utils-main.js";

const renderizarHechizos = async () => {
    const contenedorProductos = document.querySelector('.productos');
    const contenedorBotones = document.querySelector('.contenedor-botones'); 
    const btnPrev = document.querySelector('.prev-btn');
    const btnNext = document.querySelector('.next-btn');

    const hechizos = await obtenerHechizos();
    for (const hechizo of hechizos) {
        const nuevoHechizo = new Spell(hechizo.id, hechizo.name, hechizo.image);
        const elementoHTML = nuevoHechizo.render();
        contenedorProductos.appendChild(elementoHTML);
    }

    let currentIndex = 0;
    const cards = document.querySelectorAll('.productos__producto');
    const totalCards = cards.length;

    
    const showCards = () => {
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + 3) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    const nextSlide = () => {
        if (currentIndex < totalCards - 3) {
            currentIndex++;
            showCards();
        }
    };
   
    const prevSlide = () => {
        if (currentIndex > 0) {
            currentIndex--;
            showCards();
        }
    };

    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    contenedorBotones.appendChild(btnPrev);
    contenedorBotones.appendChild(btnNext);

    showCards();
};
renderizarHechizos();
