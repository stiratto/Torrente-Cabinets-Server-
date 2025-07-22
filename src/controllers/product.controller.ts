import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts = async (req: Request, res: Response) => {
    // throw new Error('asd')
    try {
      const result = await this.productService.getProducts(req, res);
      res.status(200).send(result);
    }catch(err: any) {
      res.status(400).send(err.message)
      throw new Error(`Failed to fetch all products: ${err.message}`)
    }
  
  };

  getCartProducts = async (req: Request, res: Response) => {
    try {
      const result = await this.productService.getCartProducts(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };

  getProductDetails = async (req: Request, res: Response) => {
    try {
      const result = await this.productService.getProductDetails(req, res);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  };
}
