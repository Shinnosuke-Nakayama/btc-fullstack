import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = "ap-southeast-2";
const BUCKET_NAME = "btcfullstack";
const IDENTITY_POOL_ID = "ap-southeast-2:bb3c9257-be26-43c9-bb18-f98545705602";

const s3Client = new S3Client({
  region: REGION,
  requestChecksumCalculation: "WHEN_REQUIRED",
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

export async function getPhotos() {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
  });
  const response = await s3Client.send(command);

  if (response.KeyCount === 0) {
    return null;
  }

  const sortedByNewestContents = response.Contents.toSorted((a, b) => {
    return Date.parse(b.LastModified) - Date.parse(a.LastModified);
  });

  const photos = await Promise.all(
    sortedByNewestContents.map(async (content) => {
      return {
        key: content.Key,
        url: await s3GetSignedUrl(content.Key),
      };
    }),
  );

  console.log(photos);
  return photos;
}

export async function s3GetSignedUrl(key) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  const response = await getSignedUrl(s3Client, command, { expiresIn: 600 });
  return response;
}

export async function uploadVideo(file) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: file.name,
    Body: file,
  });
  const response = await s3Client.send(command);
  console.log(response);
  return response;
}
