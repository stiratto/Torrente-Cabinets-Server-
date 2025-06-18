"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const allowedRoles = {
    admin: ["ADMIN"],
    dealer: ["DEALER", "ADMIN"]
};
const extractToken = (req, res) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(403).send("Forbidden");
        return null;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(403).send("Forbidden");
        return null;
    }
    return token;
};
const validate = (authorization, user, res) => {
    const allowed = allowedRoles[authorization];
    if (!allowed.includes(user.role)) {
        res.status(403).send("Forbidden");
        return false;
    }
    return true;
};
const rolesMiddleware = (authorization) => {
    return (req, res, next) => {
        const token = extractToken(req, res);
        if (!token)
            return;
        const key = process.env.JWT_SECRET;
        try {
            const user = jsonwebtoken_1.default.verify(token, key);
            const valid = validate(authorization, user, res);
            if (!valid)
                return;
            next();
        }
        catch (err) {
            console.error(err);
            res.status(403).send("Invalid token");
        }
    };
};
exports.rolesMiddleware = rolesMiddleware;
