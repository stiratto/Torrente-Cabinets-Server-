import { Request, Response } from "express";
import { AdminUserService } from "../../services/admin-user.service.js";

export class AdminUserController {
  // Denie request controller
  constructor(private adminUserService = new AdminUserService()) { }

  pagination = async (req: Request, res: Response) => {
    const result = await this.adminUserService.pagination(req, res)
    res.status(200).send(result)
  };

  getRegisteredUsers = async (req: Request, res: Response) => {
    const result = await this.adminUserService.getRegisteredUsers(req, res)
    res.status(200).send(result)
  };

  getRegisteredUsersByRole = async (req: Request, res: Response) => {
    const result = await this.adminUserService.getRegisteredUsersByRole(req, res)
    res.status(200).send(result)
  };

  getSpecificId = async (req: Request, res: Response) => {
    const result = await this.adminUserService.getSpecificUser(req, res)
    res.status(200).send(result)
  };

  getAdmins = async (req: Request, res: Response) => {
    const result = await this.adminUserService.getAdmins(req, res)
    res.status(200).send(result)
  };
}




