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
exports.AdminDealerController = void 0;
const admin_dealer_service_js_1 = require("../../services/admin-dealer.service.js");
class AdminDealerController {
    constructor(adminDealerService = new admin_dealer_service_js_1.AdminDealerService()) {
        this.adminDealerService = adminDealerService;
        this.acceptRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminDealerService.acceptRequest(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
        this.denieRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminDealerService.denieRequest(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
        this.getDealerRequests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminDealerService.getDealerRequests(req, res);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
    }
}
exports.AdminDealerController = AdminDealerController;
