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
exports.BucketController = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class BucketController {
    constructor() {
        // inject dependencies
        this.bucketName = process.env.BUCKET_NAME;
        this.bucketRegion = process.env.BUCKET_REGION;
        this.accessKey = process.env.ACCESS_KEY;
        this.secretAccessKey = process.env.SECRET_ACCESS_KEY;
        this.s3 = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: this.accessKey,
                secretAccessKey: this.secretAccessKey,
            },
            region: this.bucketRegion,
        });
    }
    populateProductsWithImages(products) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(products)) {
                return yield Promise.all(products.map((p) => __awaiter(this, void 0, void 0, function* () {
                    const getObjectParams = {
                        Bucket: this.bucketName,
                        Key: p.product_image,
                    };
                    const command = new client_s3_1.GetObjectCommand(getObjectParams);
                    const url = yield (0, s3_request_presigner_1.getSignedUrl)(this.s3, command);
                    p.product_image = url;
                    return p;
                })));
            }
        });
    }
    addItem(imageName, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    Bucket: this.bucketName,
                    Key: imageName,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(params);
                yield this.s3.send(command);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    deleteItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    Bucket: this.bucketName,
                    Key: key,
                };
                const command = new client_s3_1.DeleteObjectCommand(params);
                yield this.s3.send(command);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.BucketController = BucketController;
