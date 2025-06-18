"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../lib/utils");
class AuthService {
    constructor() {
        /**
         * Registers a user in the database using the name and password from the request body
         * @returns
         */
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            const existingUser = yield db_1.prisma.user.findFirst({
                where: { name: name },
            });
            const hashedPassword = bcrypt_1.default.hashSync(password, utils_1.SALT);
            if (existingUser) {
                throw new Error("User already exists");
            }
            const registrationDate = new Date();
            const result = yield db_1.prisma.user.create({
                data: {
                    name,
                    password: hashedPassword,
                    registrationDate: registrationDate,
                },
            });
            return result;
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            const validUser = yield db_1.prisma.user.findFirst({
                where: {
                    name, // Use the name to locate the user
                },
            });
            if (!validUser) {
                throw new Error("Invalid user");
            }
            const validPassword = bcrypt_1.default.compareSync(password, validUser.password);
            if (!validPassword) {
                throw new Error("Invalid password");
            }
            const token = jsonwebtoken_1.default.sign({
                id: validUser.id,
                name: validUser.name,
                role: validUser.role,
            }, process.env.JWT_SECRET, {
                expiresIn: 3600,
            });
            return token;
        });
    }
}
exports.AuthService = AuthService;
