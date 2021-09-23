export const checkRole = (user) => {
    if (user?.roles?.rol === "Administrador" || user?.roles?.rol === "Admin") {
      return 1;
    }
    if (user?.roles?.rol === "Moderador") {
      return 2;
    }
    return 0;
  };