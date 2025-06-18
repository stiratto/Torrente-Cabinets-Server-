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
exports.ProductController = void 0;
const product_service_js_1 = require("../services/product.service.js");
class ProductController {
    constructor() {
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // throw new Error('asd')
            try {
                const result = yield this.productService.getProducts(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
                throw new Error(`Failed to fetch all products: ${err.message}`);
            }
        });
        this.getCartProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.productService.getCartProducts(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
        this.getProductDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.productService.getProductDetails(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
        this.productService = new product_service_js_1.ProductService();
    }
}
exports.ProductController = ProductController;
