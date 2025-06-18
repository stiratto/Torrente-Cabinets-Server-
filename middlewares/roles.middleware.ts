import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express";
dotenv.config()

const allowedRoles = {
   admin: ["ADMIN"],
   dealer: ["DEALER", "ADMIN"]
}

const extractToken = (req: any, res: any) => {
   const authHeader = req.get('Authorization')
   if (!authHeader) {
      res.status(403).send("Forbidden")
      return null
   }

   const token = authHeader.split(" ")[1]
   if (!token) {
      res.status(403).send("Forbidden")
      return null
   }

   return token
}

const validate = (authorization: "admin" | "dealer", user: any, res: any) => {
   const allowed = allowedRoles[authorization]

   if (!allowed.includes(user.role)) {
      res.status(403).send("Forbidden")
      return false
   }
   return true
}

export const rolesMiddleware = (authorization: any) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const token = extractToken(req, res)
      if (!token) return
      const key = process.env.JWT_SECRET;
      try {
         const user = jwt.verify(token, key as string)
         const valid = validate(authorization, user, res)
         if (!valid) return
         next()
      } catch (err) {
         console.error(err)
         res.status(403).send("Invalid token")
      }
   }

}
