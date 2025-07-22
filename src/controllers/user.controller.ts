import { Request, Response } from "express";
import { UserService } from "@/services/user.service";

export class UserController {
  constructor(private userService: UserService = new UserService()) { }

  dealerForm = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.dealerForm(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.send(400).send(err.message);
    }
  };
}
