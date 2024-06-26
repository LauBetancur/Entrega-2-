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
        link.href = `characterdetails.html?id=${this.id}`;

        const img = document.createElement("img");
        img.src = this.image;
        img.alt = this.name;

        const h2 = document.createElement("h2");
        h2.textContent = this.name;


        producto.appendChild(img);
        producto.appendChild(h2);
        

        producto.appendChild(link);
        return producto;
    };
}
