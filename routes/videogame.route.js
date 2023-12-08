import { Router } from "express";
import {
  createVideogame,
  getVideogame,
  getVideogames,
  removeVideogame,
  updateVideogame,
} from "../controllers/videogame.controller.js";
import { requireToken } from "../middlewares/requireUserToken.js";
import {
  bodyVideogameValidator,
  paramVideogameValidator,
} from "../middlewares/validatorManager.js";
import { validatepermissions } from "../middlewares/validatepermissions.js";
const router = Router();

router.get("/", getVideogames);
router.get("/:id", requireToken, validatepermissions, getVideogame);
router.post(
  "/",
  requireToken,
  validatepermissions,
  bodyVideogameValidator,

  createVideogame
);
router.put(
  "/:id",
  requireToken,
  validatepermissions,
  paramVideogameValidator,
  bodyVideogameValidator,
  updateVideogame
);
router.delete(
  "/:id",
  requireToken,
  validatepermissions,
  paramVideogameValidator,
  removeVideogame
);
export default router;
