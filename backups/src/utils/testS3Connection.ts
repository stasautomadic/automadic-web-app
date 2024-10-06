import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

async function testS3Connection() {
  const testFileName = `${process.env.VITE_AWS_S3_FOLDER}/test-file-${Date.now()}.txt`;
  const testFileContent = "This is a test file to verify S3 connection and upload.";

  const command = new PutObjectCommand({
    Bucket: process.env.VITE_AWS_S3_BUCKET,
    Key: testFileName,
    Body: testFileContent,
    ContentType: "text/plain",
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log("Generated signed URL:", signedUrl);

    const response = await fetch(signedUrl, {
      method: "PUT",
      body: testFileContent,
      headers: {
        "Content-Type": "text/plain",
      },
    });

    if (response.ok) {
      console.log("Test file uploaded successfully!");
      console.log("File URL:", `https://${process.env.VITE_AWS_S3_BUCKET}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/${testFileName}`);
    } else {
      console.error("Failed to upload test file:", response.statusText);
    }
  } catch (error) {
    console.error("Error during S3 test:", error);
  }
}

testS3Connection();