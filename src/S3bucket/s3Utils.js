import AWS from "aws-sdk";

const uploadToS3AndGenerateUrl = async (file) => {
  try {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: "us-east-1",
    });

    const s3 = new AWS.S3();
    const params = {
      Bucket: "stardust-imgs",
      Key: file.name,
      Body: file,
    };

    const uploadResult = await s3.upload(params).promise();
    const imageUrl = uploadResult.Location;
    return imageUrl;
  } catch (error) {
    throw new Error("Error uploading to S3");
  }
};

export default uploadToS3AndGenerateUrl;
