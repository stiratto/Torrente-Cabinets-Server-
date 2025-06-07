import {Router} from "express"
import { getCartProducts, getProductDetails, getProducts } from "../controllers/product.controller.js";

const router = Router();

router.get("/getProducts", getProducts);
router.get("/getCartProducts/:id", getCartProducts);
router.get("/getProductDetails/:id", getProductDetails);

export default router
