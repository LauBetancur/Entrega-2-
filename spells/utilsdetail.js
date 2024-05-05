// utilsdetail.js
export const obtenerHechizos = async () => {
    const response = await fetch("https://raw.githubusercontent.com/LauBetancur/Entrega-2-/main/spells/spells.json");
    const data = await response.json();
    return data;
};

export class Spell {
    constructor(id, name, image, description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
    }

    render() {
        const spellElement = document.createElement("div");
        spellElement.classList.add("spell");

        const imgElement = document.createElement("img");
        imgElement.setAttribute('src', this.image);
        imgElement.setAttribute('alt', this.name);

        const nameElement = document.createElement("h2");
        nameElement.textContent = this.name;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = this.description;

        spellElement.appendChild(imgElement);
        spellElement.appendChild(nameElement);
        spellElement.appendChild(descriptionElement);

        return spellElement;
    }
}
