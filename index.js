"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const product_routes_js_1 = __importDefault(require("./routes/product.routes.js"));
const admin_routes_js_1 = __importDefault(require("./routes/admin.routes.js"));
const roles_middleware_js_1 = require("./middlewares/roles.middleware.js");
const pino_1 = require("pino");
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const logger = (0, pino_1.pino)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/admin', (0, roles_middleware_js_1.rolesMiddleware)("admin"), admin_routes_js_1.default);
app.use('/auth', auth_routes_js_1.default);
app.use('/user', user_routes_js_1.default);
app.use('/product', product_routes_js_1.default);
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ message: "Unexpected error" });
});
app.listen(process.env.LISTEN_PORT, () => {
    console.log(`Server running on port: ${process.env.LISTEN_PORT}`);
});
