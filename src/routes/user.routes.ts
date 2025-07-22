import { Router } from "express"
import { UserController } from "@/controllers/user.controller.js";

export class UserRouter {
  private router: Router
  private userController: UserController

  constructor() {
    this.router = Router()
    this.userController = new UserController()
    this.routes()
  }

  private routes() {
    this.router.post("/dealerForm", this.userController.dealerForm)
  }

  getRouter() {
    return this.router
  }
}

export default new UserRouter().getRouter()
