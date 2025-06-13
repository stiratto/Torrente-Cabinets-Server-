import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import {prisma} from "../../db.js"
import crypto from "crypto"
import { BucketController } from "../bucket.controller.js";
import {Request, Response} from "express"
import { randomImageName } from "../../lib/utils.js";



export class AdminProductController {

  private bucketController: BucketController;

  constructor() {
    this.bucketController = new BucketController()
  }

  addProduct = async (req: Request, res: Response) => {
    const imageName = randomImageName();

    this.bucketController.addItem(imageName, req.file!)
    
    
    const product = await prisma.product.create({
      data: {
        product_name: req.body.product_name,
        product_price: parseFloat(req.body.product_price),
        product_description: req.body.product_description,
        product_stock: parseInt(req.body.product_quantity),
        product_image: imageName,
      },
    });
    res.send(product);
  };

  deleteProduct = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      res.status(404).send("Post not found");
      return;
    }

    this.bucketController.deleteItem(product.product_image)
    await prisma.product.delete({ where: { id } });
    res.send(product);
  };

    
}


