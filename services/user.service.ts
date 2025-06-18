import { Request, Response } from "express";
import { prisma } from "../db";
import { Dealer } from "@prisma/client";

export class UserService {
  dealerForm = async (
    req: Request,
    res: Response
  ): Promise<Dealer | undefined> => {
    const {
      name,
      company_email,
      companyvendor_name,
      ein,
      company_address,
      phone_number,
      personal_email,
      company_description,
      userId,
    } = req.body;

    const existingEmail = await prisma.dealer.findFirst({
      where: {
        company_email: company_email,
      },
    });

    if (!existingEmail) {
      const result = await prisma.dealer.create({
        data: {
          name,
          company_email,
          companyvendor_name,
          ein,
          company_address,
          phone_number,
          personal_email,
          company_description,
          userId,
        },
      });
      return result;
    } else {
      throw new Error("Email already exists");
    }
  };
}
