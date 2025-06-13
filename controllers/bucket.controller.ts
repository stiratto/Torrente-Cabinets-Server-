import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Product } from "@prisma/client";

export class BucketController {
   private s3: S3Client;
   private bucketName: string;
   private bucketRegion: string;
   private accessKey: string
   private secretAccessKey: string
   

   constructor() {
      // inject dependencies
      this.bucketName = process.env.BUCKET_NAME!;
      this.bucketRegion = process.env.BUCKET_REGION!;
      this.accessKey = process.env.ACCESS_KEY!;
      this.secretAccessKey = process.env.SECRET_ACCESS_KEY!;

      this.s3 = new S3Client({
        credentials: {
           accessKeyId: this.accessKey,
           secretAccessKey: this.secretAccessKey,
        },
        region: this.bucketRegion,
      })
   }

   async populateProductsWithImages(products: Product[]) {
      if (Array.isArray(products)) {
         return await Promise.all(products.map(async (p) => {
            const getObjectParams = {
               Bucket: this.bucketName,
               Key: p.product_image,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(this.s3, command);
            p.product_image = url;
            return p
         }))

      }
   }

   async addItem(imageName: string, file: Express.Multer.File) {
      try {
         const params = {
            Bucket: this.bucketName,
            Key: imageName,
            Body: file.buffer,
            ContentType: file.mimetype,
         };
         const command = new PutObjectCommand(params);
                                                       
         await this.s3.send(command);
      }catch(err: any){
         throw new Error(err)
      }
   }
      
   async deleteItem(key: string) {
      try {
         const params = {
            Bucket: this.bucketName,
            Key: key,
         };
         const command = new DeleteObjectCommand(params);
         await this.s3.send(command);
      } catch(err: any) {
         throw new Error(err)
      }
   }      

}
