import { registrar } from "./session.js";

const render = () => {
  const registro = document.querySelector("#registro");

  registro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const correo = e.target.correo.value;
    const contrasena = e.target.contrasena.value;
    const confirmarContrasena = e.target.confirmarContrasena.value;

    try {
      registrar(correo, contrasena, confirmarContrasena, nombre, apellido);
      alert("Usuario registrado exitosamente");
      window.location.href = "..//login.html";
    } catch (error) {
      alert(error.message);
    }
  });
};

document.addEventListener("DOMContentLoaded", render);

