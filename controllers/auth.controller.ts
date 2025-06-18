import bcrypt from "bcrypt";
import { AuthService } from "../services/auth.service.js";
import { Request, Response } from "express";

const salt = bcrypt.genSaltSync(10);

export class AuthController {
  constructor(private authService: AuthService = new AuthService()) {}

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.register(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };
}
