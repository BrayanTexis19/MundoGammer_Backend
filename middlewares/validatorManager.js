import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const paramVideogameValidator = [
  param("id", "Formato no válido (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
  validationResultExpress,
];

export const bodyVideogameValidator = [
  body("title", "el campo titulo es obligatorio").trim().isString().notEmpty(),
  body("description", "el campo descripción es obligatorio")
    .trim()
    .isString()
    .notEmpty(),
  body("gender", "el campo genero es obligatorio").trim().isString().notEmpty(),
  body("developer", "el campo desarrolador es obligatorio")
    .trim()
    .isString()
    .notEmpty(),
  body("platform", "el campo plataforma es obligatorio")
    .isArray({ min: 1 })
    .notEmpty(),
  body("releaseDate", "el campo fecha de lanzamiento es obligatorio")
    .trim()
    .isString()
    .notEmpty(),
  body("gameMode", "el campo Modo de juegp es obligatorio").trim().notEmpty(),
  body("price", "el campo precio es obligatorio").isNumeric().notEmpty(),
  body("score", "el campo puntuación es obligatorio").isNumeric().notEmpty(),
  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "El formato de email es incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener minimo 8 caracteres")
    .trim()
    .isLength({ min: 8 }),
  body("username", "Es necesario ingresar un nombre de usuario")
    .trim()
    .notEmpty(),
  body("rol", "Es necesario ingresar un rol de usuario").trim().notEmpty(),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "El formato de email es incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener minimo 8 caracteres")
    .trim()
    .isLength({ min: 8 }),
  validationResultExpress,
];
