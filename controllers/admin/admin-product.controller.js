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
exports.AdminProductController = void 0;
const admin_product_service_js_1 = require("../../services/admin-product.service.js");
class AdminProductController {
    constructor() {
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminProductService.addProduct(req, res);
            res.send(result);
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminProductService.deleteProduct(req, res);
            res.send(result);
        });
        this.adminProductService = new admin_product_service_js_1.AdminProductService();
    }
}
exports.AdminProductController = AdminProductController;
