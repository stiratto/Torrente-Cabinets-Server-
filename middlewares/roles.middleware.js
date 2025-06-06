import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const allowedRoles = {
   admin: ["ADMIN"],
   dealer: ["DEALER", "ADMIN"]
}

const extractToken = (req, res) => {
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

const validate = (authorization, user, res) => {
   const allowed = allowedRoles[authorization]

   if (!allowed.includes(user.role)) {
      res.status(403).send("Forbidden")
      return false
   }
   return true
}

export const rolesMiddleware = (authorization) => {
   return (req, res, next) => {
      const token = extractToken(req, res)
      if (!token) return
      const key = process.env.JWT_SECRET;
      try {
         const user = jwt.verify(token, key)
         const valid = validate(authorization, user, res)
         if (!valid) return
         next()
      } catch(err) {
         return res.status(403).send("Invalid token")
      }
   }
   
}
