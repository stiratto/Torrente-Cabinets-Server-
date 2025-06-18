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
exports.ProductService = void 0;
const db_1 = require("../db");
const bucket_controller_1 = require("../controllers/bucket.controller");
class ProductService {
    constructor(bucketController = new bucket_controller_1.BucketController()) {
        this.bucketController = bucketController;
        /**
         * Returns all products with images URL included
         * @returns {Product[]} products
         */
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield db_1.prisma.product.findMany({
                orderBy: {
                    id: "desc",
                },
            });
            const populatedProducts = yield this.bucketController.populateProductsWithImages(products);
            return populatedProducts;
        });
        this.getCartProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { productsIds } = req.body.data;
            console.log(productsIds, typeof productsIds);
            const result = yield db_1.prisma.product.findMany({
                where: {
                    id: {
                        in: productsIds
                    }
                }
            });
            if (!result) {
                throw new Error("Couldn't find products with those id's");
            }
            const resultWithImages = yield this.bucketController.populateProductsWithImages(result);
            return resultWithImages;
        });
        /**
         * Queries the data of a single product, included the image url from the bucket
         * @returns Product
         */
        this.getProductDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = parseInt(req.params.id, 10);
            try {
                const product = yield db_1.prisma.product.findUnique({
                    where: {
                        id: productId,
                    },
                });
                if (!product) {
                    res.status(404).send("Product not found");
                    return;
                }
                const finalProduct = yield this.bucketController.populateProductsWithImages([product]);
                return finalProduct[0];
            }
            catch (error) {
                throw new Error(`An error ocurred: ${error.message}`);
            }
        });
    }
}
exports.ProductService = ProductService;
