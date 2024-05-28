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

    document.getElementById('changeButton').addEventListener('click', () => {
        const newPassword = document.getElementById('newPassword').value;

        // Lógica para cambiar la contraseña
        if (newPassword) {
            usuarioActivo.contrasena = newPassword;
        }

        const updatedInfo = {
            nombre: usuarioActivo.nombre,
            apellido: usuarioActivo.apellido,
            correo: document.getElementById('email').value,
            contrasena: newPassword || usuarioActivo.contrasena
        };

        try {
            updateUserInfo(updatedInfo);
            alert('Información de usuario actualizada exitosamente.');
            window.location.reload();
        } catch (error) {
            alert(`Error al actualizar la información del usuario: ${error.message}`);
        }
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        logout();
        window.location.href = '../index.html';
    });

    document.getElementById('desc--btn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
};

document.addEventListener('DOMContentLoaded', render);
