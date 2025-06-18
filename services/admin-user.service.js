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
exports.AdminUserService = void 0;
const db_1 = require("../db");
class AdminUserService {
    constructor() {
        this.pagination = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.skip && req.query.take) {
                    const result = yield db_1.prisma.user.findMany({
                        orderBy: {
                            id: "asc",
                        },
                        skip: +req.query.skip,
                        take: +req.query.take,
                    });
                    return result;
                }
            }
            catch (err) {
                throw new Error(`Failed to fetch paginated users: ${err.message}`);
            }
        });
        this.getRegisteredUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.take) {
                    const result = yield db_1.prisma.user.findMany({
                        orderBy: {
                            id: "asc",
                        },
                        take: +req.query.take,
                    });
                    return result;
                }
            }
            catch (err) {
                throw new Error(`Failed to fetch registered users: ${err.message}`);
            }
        });
        this.getRegisteredUsersByRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.prisma.user.findMany({
                    where: {
                        role: req.query.role,
                    },
                    orderBy: {
                        id: "asc",
                    },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Failed to fetch users by role: ${err.message}`);
            }
        });
        this.getSpecificUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield db_1.prisma.user.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Failed to fetch specific user: ${err.message}`);
            }
        });
        this.getAdmins = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.prisma.user.findMany({
                    where: {
                        role: "ADMIN",
                    },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Failed to fetch all admins: ${err.message}`);
            }
        });
    }
}
exports.AdminUserService = AdminUserService;
