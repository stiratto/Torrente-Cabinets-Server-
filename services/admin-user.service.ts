import { Request, Response } from "express";
import { prisma } from "../db";
import { ROLE } from "@prisma/client";

export class AdminUserService {
  pagination = async (req: Request, res: Response) => {
    try {
      if (req.query.skip && req.query.take) {
        const result = await prisma.user.findMany({
          orderBy: {
            id: "asc",
          },
          skip: +req.query.skip,
          take: +req.query.take,
        });
        return result;
      }
    } catch (err: any) {
      throw new Error(`Failed to fetch paginated users: ${err.message}`);
    }
  };

  getRegisteredUsers = async (req: Request, res: Response) => {
    try {
      if (req.query.take) {
        const result = await prisma.user.findMany({
          orderBy: {
            id: "asc",
          },
          take: +req.query.take,
        });
        return result;
      }
    } catch (err: any) {
      throw new Error(`Failed to fetch registered users: ${err.message}`);
    }
  };

  getRegisteredUsersByRole = async (req: Request, res: Response) => {
    try {
      const result = await prisma.user.findMany({
        where: {
          role: req.query.role as ROLE,
        },
        orderBy: {
          id: "asc",
        },
      });
      return result;
    } catch (err: any) {
      throw new Error(`Failed to fetch users by role: ${err.message}`);
    }
  };

  getSpecificUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      return result;
    } catch (err: any) {
      throw new Error(`Failed to fetch specific user: ${err.message}`);
    }
  };

  getAdmins = async (req: Request, res: Response) => {
    try {
      const result = await prisma.user.findMany({
        where: {
          role: "ADMIN",
        },
      });

      return result
    }catch(err: any) {
      throw new Error(`Failed to fetch all admins: ${err.message}`)
    }
 
  };
}
