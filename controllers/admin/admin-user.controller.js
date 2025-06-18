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
exports.AdminUserController = void 0;
const admin_user_service_js_1 = require("../../services/admin-user.service.js");
class AdminUserController {
    // Denie request controller
    constructor(adminUserService = new admin_user_service_js_1.AdminUserService()) {
        this.adminUserService = adminUserService;
        this.pagination = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUserService.pagination(req, res);
            res.status(200).send(result);
        });
        this.getRegisteredUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUserService.getRegisteredUsers(req, res);
            res.status(200).send(result);
        });
        this.getRegisteredUsersByRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUserService.getRegisteredUsersByRole(req, res);
            res.status(200).send(result);
        });
        this.getSpecificId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUserService.getSpecificUser(req, res);
            res.status(200).send(result);
        });
        this.getAdmins = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUserService.getAdmins(req, res);
            res.status(200).send(result);
        });
    }
}
exports.AdminUserController = AdminUserController;
