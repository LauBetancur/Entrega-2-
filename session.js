const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);
    if (!usuarios) {
        return [];
    }
    return JSON.parse(usuarios);
};

export const registrar = (correo, contrasena, confirmarContrasena, nombre, apellido) => {
    if (contrasena !== confirmarContrasena) {
        throw new Error("Las contraseñas no coinciden");
    }

    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        if (usuario.correo === correo) {
            throw new Error("El correo ya se encuentra registrado");
        }
    }

    usuarios.push({
        id: new Date().getTime(),
        correo: correo,
        contrasena: contrasena,
        nombre: nombre,
        apellido: apellido,
        favoritos: [],
    });

    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};

export const login = (correo, contrasena) => {
    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        if (usuario.correo === correo && usuario.contrasena === contrasena) {
            localStorage.setItem(USUARIO_ACTIVO_KEY, usuario.id);
            return usuario;
        }
    }
    throw new Error("Usuario y/o contraseña incorrectos");
};

export const obtenerUsuarioEnSesion = () => {
    const usuarioActivo = localStorage.getItem(USUARIO_ACTIVO_KEY);
    if (!usuarioActivo) {
        return null;
    }

    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        if (usuario.id === parseInt(usuarioActivo)) {
            return usuario;
        }
    }
    return null;
};
export const updateUserInfo = (updatedInfo) => {
  const usuarios = obtenerUsuarios();
  const usuarioActivoId = parseInt(localStorage.getItem(USUARIO_ACTIVO_KEY));
  for (let usuario of usuarios) {
    if (usuario.id === usuarioActivoId) {
      Object.assign(usuario, updatedInfo);
      localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
      return;
    }
  }

  throw new Error("Usuario no encontrado");
};

export const logout = () => {
    localStorage.removeItem(USUARIO_ACTIVO_KEY);
};

export const agregarFavorito = (item) => {
  const usuarios = obtenerUsuarios();
  const usuarioActivoId = parseInt(localStorage.getItem(USUARIO_ACTIVO_KEY));

  for (let usuario of usuarios) {
    if (usuario.id === usuarioActivoId) {
      if (!usuario.favoritos.some(fav => fav.id === item.id)) {
        usuario.favoritos.push({ id: item.id, name: item.name, image: item.image, type: item.type }); // Include ID in the favorite object
        localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
      }
      return;
    }
  }
  throw new Error("Usuario no encontrado");
};

export const obtenerFavoritos = () => {
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
        throw new Error("No hay usuario en sesión");
    }
    return usuarioActivo.favoritos;
};
