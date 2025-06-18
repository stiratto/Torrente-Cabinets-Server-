"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const router = (0, express_1.Router)();
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_js_1.UserController();
        this.routes();
    }
    routes() {
        this.router.post("/dealerForm", this.userController.dealerForm);
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().getRouter();
