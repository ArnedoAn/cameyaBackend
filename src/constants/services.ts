import Minio from "minio";
import * as MinioKeys from "../../credentials.json";

const minioClient = new Minio.Client({
  endPoint: MinioKeys.url,
  port: 9000,
  useSSL: true,
  accessKey: MinioKeys.accessKey,
  secretKey: MinioKeys.secretKey,
});

export const servicesConstanst = {
  minioClient,
  minioBucket: "semard",
};
