import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import {prisma} from "../../db.js"
import crypto from "crypto"
import dotenv from "dotenv"
dotenv.config();


const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;


const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey,
  },
  region: bucketRegion,
});


export const addProduct = async (req, res) => {
  const imageName = randomImageName();
  console.log(req.file)
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3.send(command);

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

export const deleteProduct = async (req, res) => {
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
  const params = {
    Bucket: bucketName,
    Key: product.product_image,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);

  await prisma.product.delete({ where: { id } });
  res.send(product);
};


