import { Request, Response } from "express";
import { prisma } from "../db";

export class AdminDealerService {
  getDealerRequests = async (req: Request, res: Response) => {
    try {
      const result = await prisma.dealer.findMany({
        orderBy: {
          id: "desc",
        },
      });
      return result;
    } catch (err: any) {
      throw new Error(`Failed to fetch dealer requests: ${err.message}`);
    }
  };

  denieRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const result = await prisma.dealer.delete({
        where: {
          id: id,
        },
      });

      return result;
    } catch (err: any) {
      throw new Error(`Failed to deny dealer request: ${err.message}`);
    }
  };

  /**
   * Accepts a request using the id from the req body
   */
  acceptRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const result = await prisma.user.update({
        where: {
          id,
        },
        data: {
          role: "DEALER",
        },
      });

      if (result) {
        await prisma.dealer.delete({
          where: {
            id,
          },
        });
        return result;
      }
    } catch (err: any) {
      throw new Error(`Failed to accept dealer request: ${err.message}`);
    }
  };
}
