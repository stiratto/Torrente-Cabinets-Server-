const { Router } = require("express");
const { dealerForm } = require("../controllers/user.controller");
const { register, login } = require("../controllers/auth.controller");
const router = Router();

router.post("/dealerForm", dealerForm)
// Register account
router.post("/register", register);
// Login account
router.post("/login", login);



module.exports = router;
