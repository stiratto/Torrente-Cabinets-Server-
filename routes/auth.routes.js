"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.routes();
    }
    routes() {
        this.router.post("/register", this.authController.register);
        this.router.post("/login", this.authController.login);
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRouter = AuthRouter;
exports.default = new AuthRouter().getRouter();
