import { Request, Response } from "express";
import { AdminDealerService } from "../../services/admin-dealer.service.js";

export class AdminDealerController {
  constructor(
    private adminDealerService: AdminDealerService = new AdminDealerService()
  ) {}

  acceptRequest = async (req: Request, res: Response) => {
    try {
      const result = await this.adminDealerService.acceptRequest(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  denieRequest = async (req: Request, res: Response) => {
    try {
      const result = await this.adminDealerService.denieRequest(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  getDealerRequests = async (req: Request, res: Response) => {
    try {
      const result = await this.adminDealerService.getDealerRequests(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };
}
