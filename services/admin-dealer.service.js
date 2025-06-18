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
exports.AdminDealerService = void 0;
const db_1 = require("../db");
class AdminDealerService {
    constructor() {
        this.getDealerRequests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.prisma.dealer.findMany({
                    orderBy: {
                        id: "desc",
                    },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Failed to fetch dealer requests: ${err.message}`);
            }
        });
        this.denieRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const result = yield db_1.prisma.dealer.delete({
                    where: {
                        id: id,
                    },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Failed to deny dealer request: ${err.message}`);
            }
        });
        /**
         * Accepts a request using the id from the req body
         */
        this.acceptRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const result = yield db_1.prisma.user.update({
                    where: {
                        id,
                    },
                    data: {
                        role: "DEALER",
                    },
                });
                if (result) {
                    yield db_1.prisma.dealer.delete({
                        where: {
                            id,
                        },
                    });
                    return result;
                }
            }
            catch (err) {
                throw new Error(`Failed to accept dealer request: ${err.message}`);
            }
        });
    }
}
exports.AdminDealerService = AdminDealerService;
