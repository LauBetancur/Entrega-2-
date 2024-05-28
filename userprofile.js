import { obtenerUsuarioEnSesion, logout, updateUserInfo } from './session.js';

const render = () => {
    const usuarioActivo = obtenerUsuarioEnSesion();

    if (!usuarioActivo) {
        window.location.href = '/index.html';
        return;
    }

    document.getElementById('pfp--name--username').innerText = usuarioActivo.nombreCompleto || usuarioActivo.correo;
    document.getElementById('firstName').value = usuarioActivo.nombre || '';
    document.getElementById('lastName').value = usuarioActivo.apellido || '';
    document.getElementById('email').value = usuarioActivo.correo;
    document.getElementById('password').value = usuarioActivo.contrasena;

    document.getElementById('changeButton').addEventListener('click', () => {
        const updatedInfo = {
            nombre: document.getElementById('firstName').value,
            apellido: document.getElementById('lastName').value,
            correo: document.getElementById('email').value,
            contrasena: document.getElementById('newPassword').value || usuarioActivo.contrasena
        };

        try {
            updateUserInfo(updatedInfo);
            alert('Información de usuario actualizada exitosamente.');
            window.location.reload();
        } catch (error) {
            alert(`Error al actualizar la información del usuario: ${error.message}`);
        }
    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.getElementById('desc--btn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
};

document.addEventListener('DOMContentLoaded', render);
