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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../db");
class UserService {
    constructor() {
        this.dealerForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, company_email, companyvendor_name, ein, company_address, phone_number, personal_email, company_description, userId, } = req.body;
            const existingEmail = yield db_1.prisma.dealer.findFirst({
                where: {
                    company_email: company_email,
                },
            });
            if (!existingEmail) {
                const result = yield db_1.prisma.dealer.create({
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
            }
            else {
                throw new Error("Email already exists");
            }
        });
    }
}
exports.UserService = UserService;
