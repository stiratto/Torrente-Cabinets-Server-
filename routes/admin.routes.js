const { Router } = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { addProduct, deleteProduct } = require("../controllers/admin/admin-product.controller");
const { getDealerRequests, acceptRequest, denieRequest } = require("../controllers/admin/admin-dealer.controller");
const { getRegisteredUsers, getRegisteredUsersByRole, getAdmins, pagination, getSpecificId } = require("../controllers/admin/admin-user.controller");


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




module.exports = router;

