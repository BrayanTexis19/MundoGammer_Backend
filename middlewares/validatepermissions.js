export const validatepermissions = (req, res, next) => {
  try {
    console.log(req.body);
    const { rol } = req.body;

    if (!rol) return res.status(403).json({ error: "Es necesario especificar el rol del usuario" });
    if (rol != "ADMIN")
      return res.status(403).json({ error: "Acceso no autorizado. No tienes permisos" });
    next();
  } catch (error) {
    console.log(error);
  }
};
