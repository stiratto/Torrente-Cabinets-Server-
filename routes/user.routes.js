import {Router} from "express"
import { dealerForm } from "../controllers/user.controller.js";
import { login, register } from "../controllers/auth.controller.js";
const router = Router();

router.post("/dealerForm", dealerForm)
// Register account
router.post("/register", register);
// Login account
router.post("/login", login);

export default router
