import { Router } from "express"
import multer from "multer"
import { addProduct, deleteProduct } from "../controllers/admin/admin-product.controller.js";
import { acceptRequest, denieRequest, getDealerRequests } from "../controllers/admin/admin-dealer.controller.js";
import { getAdmins, getRegisteredUsers, getRegisteredUsersByRole, getSpecificId, pagination } from "../controllers/admin/admin-user.controller.js";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post("/product/createProduct", upload.single("product_image"), addProduct);
router.delete("/product/deleteProduct/:id", deleteProduct);
router.get("/dealer/dealerRequests", getDealerRequests);
router.put("/dealer/acceptRequest", acceptRequest);
router.delete("/dealer/denieRequest", denieRequest);
// Get all registered users
router.get("/user/getRegisteredUsers", getRegisteredUsers);
// Filter all registered users by role
router.get("/user/filterUsersByRole/:role", getRegisteredUsersByRole);
router.get("/user/getAdmins", getAdmins);
// Pagination
router.get("/user/pagination", pagination);
// Get specific id user
router.get("/user/getSpecificId/:id", getSpecificId);



export default router
