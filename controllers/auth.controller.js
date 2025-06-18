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
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_js_1 = require("../services/auth.service.js");
const salt = bcrypt_1.default.genSaltSync(10);
class AuthController {
    constructor(authService = new auth_service_js_1.AuthService()) {
        this.authService = authService;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authService.register(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authService.login(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
    }
}
exports.AuthController = AuthController;
