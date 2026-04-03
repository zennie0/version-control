import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION});

export const s3 = new AWS.S3();

export const S3_BUCKET="zainabmy-bucket";

// module.exports = {s3, S3_BUCKET};