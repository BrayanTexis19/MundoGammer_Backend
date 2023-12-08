import {
  generateRefreshToken,
  generateToken,
} from "../helpers/generateToken.js";
import { User } from "../models/User.js";

export const login = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "Usuario no registrado" });

    const resPassword = await user.comparePassword(password);
    if (!resPassword)
      return res.status(403).json({ error: "Credenciales Incorrectas" });

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, username, rol } = req.body;

    // * Validar si ya existe un registro con un mismo email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000, email: user.email };

    user = new User({ email, password, username, rol });
    await user.save();

    return res.status(201).json({ msg: "Usuario Registrado" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Ya existe un usuario registrado con correo: " + error.email,
      });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    return res.json({
      email: user.email,
      username: user.username,
      rol: user.rol,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};
