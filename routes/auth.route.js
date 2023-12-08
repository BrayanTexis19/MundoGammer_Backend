import { Router } from "express";
import {
  infoUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireUserToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";
const router = Router();

router.post("/login", bodyLoginValidator, login);
router.post("/register", bodyRegisterValidator, register);

router.get("/getUser", requireToken, infoUser);
router.get("/tokenRefresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;
