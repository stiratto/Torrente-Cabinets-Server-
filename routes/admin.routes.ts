import { Router } from "express"
import multer from "multer"
import { AdminProductController } from "../controllers/admin/admin-product.controller.js";
import { AdminDealerController } from "../controllers/admin/admin-dealer.controller.js";
import { AdminUserController } from "../controllers/admin/admin-user.controller.js";

class AdminRoutes {
   private router: Router;
   private adminProductController: AdminProductController;
   private adminDealerController: AdminDealerController;
   private adminUserController: AdminUserController;
   private upload: multer.Multer

   constructor() {
      this.router = Router()
      this.adminProductController = new AdminProductController()
      this.adminDealerController = new AdminDealerController()
      this.adminUserController = new AdminUserController()
      this.upload = multer({storage: multer.memoryStorage() })

      this.routes()
   }

   private routes() {
      this.router.post('/product/createProduct', this.upload.single("product_image"), this.adminProductController.addProduct)
      this.router.delete('/product/deleteProduct/:id', this.adminProductController.deleteProduct)
      this.router.get('/dealer/dealerRequests', this.adminDealerController.getDealerRequests)
      this.router.put('/dealer/acceptRequest/', this.adminDealerController.acceptRequest)

      this.router.delete('/dealer/denieRequest/', this.adminDealerController.denieRequest)
      this.router.get("/user/getRegisteredUsers", this.adminUserController.getRegisteredUsers)
      this.router.get("/user/filterUsersByRole/:role", this.adminUserController.getRegisteredUsersByRole)
      this.router.get("/user/getAdmins", this.adminUserController.getAdmins)
      this.router.get("/user/pagination", this.adminUserController.pagination)
      this.router.get("/user/getSpecificId/:id", this.adminUserController.getSpecificId)
   }

   getRouter() {
      return this.router
   }
}


export default new AdminRoutes().getRouter()
