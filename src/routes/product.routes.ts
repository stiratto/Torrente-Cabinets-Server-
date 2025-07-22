import { Router } from "express"
import { ProductController } from "@/controllers/product.controller";

class ProductRoutes {
   private router: Router;
   private productController: ProductController;

   constructor() {
      this.router = Router()
      this.productController = new ProductController()
      this.routes()
   }

   private routes() {
      this.router.get('/getProducts', this.productController.getProducts)
      this.router.post('/getCartProducts/', this.productController.getCartProducts)
      this.router.get('/getProductDetails/:id', this.productController.getProductDetails)
   }

   getRouter() {
      return this.router
   }
}

export default new ProductRoutes().getRouter()
