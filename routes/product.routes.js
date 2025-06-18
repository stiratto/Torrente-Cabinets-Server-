"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.ProductController();
        this.routes();
    }
    routes() {
        this.router.get('/getProducts', this.productController.getProducts);
        this.router.post('/getCartProducts/', this.productController.getCartProducts);
        this.router.get('/getProductDetails/:id', this.productController.getProductDetails);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new ProductRoutes().getRouter();
