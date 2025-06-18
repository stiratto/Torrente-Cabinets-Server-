import { Request, Response } from "express";
import { prisma } from "../db";
import { BucketController } from "../controllers/bucket.controller";
import { Product } from "@prisma/client";

export class ProductService {
  constructor(private bucketController = new BucketController()) {}

  /**
   * Returns all products with images URL included
   * @returns {Product[]} products
   */
  getProducts = async (
    req: Request,
    res: Response
  ): Promise<Product[] | undefined> => {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    const populatedProducts =
      await this.bucketController.populateProductsWithImages(products);

    return populatedProducts;
  };

  getCartProducts = async (
    req: Request,
    res: Response
  ): Promise<Product[] | undefined> => {
    const {productsIds} = req.body.data
    console.log(productsIds, typeof productsIds)

    const result = await prisma.product.findMany({
      where: {
        id: {
          in: productsIds
        }
      }
    })

    
    if (!result) {
      throw new Error("Couldn't find products with those id's")
    }

    const resultWithImages = await this.bucketController.populateProductsWithImages(result)

    return resultWithImages;
  };

  /**
   * Queries the data of a single product, included the image url from the bucket
   * @returns Product
   */
  getProductDetails = async (
    req: Request,
    res: Response
  ): Promise<Product | undefined> => {
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

      const finalProduct =
        await this.bucketController.populateProductsWithImages([product]);

      return finalProduct![0];
    } catch (error: any) {
      throw new Error(`An error ocurred: ${error.message}`);
    }
  };
}
