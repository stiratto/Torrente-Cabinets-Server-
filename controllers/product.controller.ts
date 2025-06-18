import { prisma } from "../db.js"
import {Request, Response} from "express"
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BucketController } from "./bucket.controller.js";

export class ProductController {
  private bucketController: BucketController;

  constructor() {
    this.bucketController = new BucketController()
  }

  getProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    const populatedProducts = await this.bucketController.populateProductsWithImages(products)

    res.send(populatedProducts);
  };



  getCartProducts = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);

    const result = await prisma.product.findMany({
      where: {
        id: productId,
      },
    });

    res.send(result);
  };

  getProductDetails  = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);

    try {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        res.status(404).send("Product not found");
        return;
      }

      const encodedKey = encodeURIComponent(product.product_image);

      const getObjectParams = {
        Bucket: bucketName,
        Key: encodedKey,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command);
      product.product_image = url

      res.status(200).send(product);
    } catch (error) {
      console.error(`Error fetching imageUrl for product ${productId}:`, error);
      res.status(500).send("Internal Server Error");
    }
  };


}

