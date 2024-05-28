const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
  const usuarios = localStorage.getItem(USUARIOS_KEY);

  if (!usuarios) {
    return [];
  }

  return JSON.parse(usuarios);
};

export const registrar = (correo, contrasena, confirmarContrasena) => {
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

export const logout = () => {
  localStorage.removeItem(USUARIO_ACTIVO_KEY);
};
export const obtenerFavoritos = async () => {
  const usuario = obtenerUsuarioEnSesion();
  if (!usuario) {
    return [];
  }

  const data = await obtenerHechizos();
  return data.filter(hechizo => usuario.favoritos.includes(hechizo.id));
};

export const agregarFavorito = (idProducto) => {
  const usuarios = obtenerUsuarios();
  const usuarioActivoId = parseInt(localStorage.getItem(USUARIO_ACTIVO_KEY), 10);
  const usuario = usuarios.find(usuario => usuario.id === usuarioActivoId);

  if (!usuario) {
    throw new Error("No hay un usuario activo");
  }

  if (usuario.favoritos.includes(idProducto)) {
    usuario.favoritos = usuario.favoritos.filter(favorito => favorito !== idProducto);
  } else {
    usuario.favoritos.push(idProducto);
  }

  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};