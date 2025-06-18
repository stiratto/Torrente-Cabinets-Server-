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
exports.AdminProductService = void 0;
const utils_1 = require("../lib/utils");
const db_1 = require("../db");
const bucket_controller_1 = require("../controllers/bucket.controller");
class AdminProductService {
    constructor(bucketController = new bucket_controller_1.BucketController()) {
        this.bucketController = bucketController;
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const imageName = (0, utils_1.randomImageName)();
                this.bucketController.addItem(imageName, req.file);
                const { product_description, product_price, product_name, product_stock } = req.body;
                const product = yield db_1.prisma.product.create({
                    data: {
                        product_name: product_name,
                        product_price: Number(product_price),
                        product_description: product_description,
                        product_stock: Number(product_stock),
                        product_image: imageName,
                    },
                });
                return product;
            }
            catch (err) {
                throw new Error(`Failed to add product: ${err.message}`);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const product = yield db_1.prisma.product.findFirst({
                    where: {
                        id,
                    },
                });
                if (!product) {
                    res.status(404).send("Product not found");
                    return;
                }
                this.bucketController.deleteItem(product.product_image);
                yield db_1.prisma.product.delete({ where: { id } });
                return product;
            }
            catch (err) {
                throw new Error(`Failed to delete product: ${err.message}`);
            }
        });
    }
}
exports.AdminProductService = AdminProductService;
