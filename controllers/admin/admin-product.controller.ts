import { Request, Response } from "express"
import { AdminProductService } from "../../services/admin-product.service.js";



export class AdminProductController {
  private adminProductService: AdminProductService;

  constructor() {
    this.adminProductService = new AdminProductService()
  }

  addProduct = async (req: Request, res: Response) => {
    const result = await this.adminProductService.addProduct(req, res)
    res.send(result)
  };

  deleteProduct = async (req: Request, res: Response) => {
    const result = await this.adminProductService.deleteProduct(req, res)    
    res.send(result)
  };
}


