import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter{
    private router: Router
    private authController: AuthController

    constructor(){
        this.router = Router()
        this.authController = new AuthController()
        this.routes()
    }

    private routes(){
        this.router.post("/register", this.authController.register)
        this.router.post("/login", this.authController.login)
    }

    getRouter(){
        return this.router
    }
}

export default new AuthRouter().getRouter()