"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT = exports.randomImageName = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const randomImageName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
exports.randomImageName = randomImageName;
exports.SALT = bcrypt_1.default.genSaltSync(10);
