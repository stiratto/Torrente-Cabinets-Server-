const prisma = require("../db");
const crypto = require("crypto");
const {
  S3Client,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require("dotenv");

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey,
  },
  region: bucketRegion,
});


const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  for (const product of products) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: product.product_image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    product.imageUrl = url;
  }

  res.send(products);
};



const getCartProducts = async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  const result = await prisma.product.findMany({
    where: {
      id: productId,
    },
  });

  res.send(result);
};

const getProductDetails = async (req, res) => {
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
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.status(200).send({ url });
  } catch (error) {
    console.error(`Error fetching imageUrl for product ${productId}:`, error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProducts,
  getCartProducts,
  getProductDetails,
};
