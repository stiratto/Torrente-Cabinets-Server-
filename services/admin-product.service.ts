import { Request, Response } from "express";
import { randomImageName } from "../lib/utils";
import { prisma } from "../db";
import { BucketController } from "../controllers/bucket.controller";

export class AdminProductService {
   constructor(private bucketController = new BucketController()) {}

   addProduct = async (req: Request, res: Response) => {
      try {
         const imageName = randomImageName();
                                                               
         this.bucketController.addItem(imageName, req.file!)
         const {product_description, product_price, product_name, product_stock} = req.body
                                                               
         const product = await prisma.product.create({
            data: {
               product_name: product_name,
               product_price: Number(product_price),
               product_description: product_description,
               product_stock: Number(product_stock),
               product_image: imageName,
            },
         });
         return product;
      } catch (err: any) {
         throw new Error(`Failed to add product: ${err.message}`);
      }
   };

   deleteProduct = async (req: Request, res: Response) => {
      try {
         const id = +req.params.id;
         const product = await prisma.product.findFirst({
            where: {
               id,
            },
         });
                                                            
         if (!product) {
            res.status(404).send("Product not found");
            return;
         }
                                                            
         this.bucketController.deleteItem(product.product_image)
         await prisma.product.delete({ where: { id } });
         return product;
      } catch (err: any) {
         throw new Error(`Failed to delete product: ${err.message}`);
      }
   };
}
