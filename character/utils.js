export const obtenerPersonajes = async () => {
    const response = await fetch("https://raw.githubusercontent.com/LauBetancur/Entrega-2-/main/data.json");
    const data = await response.json();
    return data;
};

export class Personaje {
    constructor(id,name,imagen) {
        this.id = id;
        this.name = name;
        this.imagen = imagen;
    };

    render() {
        const producto = document.createElement("li");
        producto.classList.add("productos__producto");
    
        const link = document.createElement("a");
        link.href= `characterdetails.html?id=${this.id}`;
     
        const img = document.createElement("img");
        img.src = this.imagen;
        this.alt = this.name;
    
        const h2 = document.createElement("h2");
        h2.textContent = this.name;
    
        const label = document.createElement("label");
            label.classList.add("star");
            label.innerHTML = '<i class="far fa-star"></i>';
    
            label.addEventListener('click', function(event) {
                event.preventDefault(); 
                label.classList.toggle('checked');
            });
    
            link.appendChild(img);
            link.appendChild(h2);
            link.appendChild(label);
    
            producto.appendChild(link);
            return producto;
    };
}

