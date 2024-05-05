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

    // Función para mostrar el carrusel en la posición actual
    const showCards = () => {
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + 3) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Función para avanzar el carrusel
    const nextSlide = () => {
        if (currentIndex < totalCards - 3) {
            currentIndex++;
            showCards();
        }
    };

    // Función para retroceder el carrusel
    const prevSlide = () => {
        if (currentIndex > 0) {
            currentIndex--;
            showCards();
        }
    };

    // Event listeners para los botones de navegación
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    // Agregar los botones al contenedor
    contenedorBotones.appendChild(btnPrev);
    contenedorBotones.appendChild(btnNext);

    // Mostrar las primeras cartas al cargar la página
    showCards();
};

// Llamar a la función para renderizar los hechizos
renderizarHechizos();
