"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const admin_product_controller_js_1 = require("../controllers/admin/admin-product.controller.js");
const admin_dealer_controller_js_1 = require("../controllers/admin/admin-dealer.controller.js");
const admin_user_controller_js_1 = require("../controllers/admin/admin-user.controller.js");
class AdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.adminProductController = new admin_product_controller_js_1.AdminProductController();
        this.adminDealerController = new admin_dealer_controller_js_1.AdminDealerController();
        this.adminUserController = new admin_user_controller_js_1.AdminUserController();
        this.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
        this.routes();
    }
    routes() {
        this.router.post('/product/createProduct', this.upload.single("product_image"), this.adminProductController.addProduct);
        this.router.delete('/product/deleteProduct/:id', this.adminProductController.deleteProduct);
        this.router.get('/dealer/dealerRequests', this.adminDealerController.getDealerRequests);
        this.router.put('/dealer/acceptRequest/', this.adminDealerController.acceptRequest);
        this.router.delete('/dealer/denieRequest/', this.adminDealerController.denieRequest);
        this.router.get("/user/getRegisteredUsers", this.adminUserController.getRegisteredUsers);
        this.router.get("/user/filterUsersByRole/:role", this.adminUserController.getRegisteredUsersByRole);
        this.router.get("/user/getAdmins", this.adminUserController.getAdmins);
        this.router.get("/user/pagination", this.adminUserController.pagination);
        this.router.get("/user/getSpecificId/:id", this.adminUserController.getSpecificId);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new AdminRoutes().getRouter();
