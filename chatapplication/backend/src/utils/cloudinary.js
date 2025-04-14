import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs/promises"; // use promise-based fs for `await fs.unlink`
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const UploadImage = async (filepath, localpath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filepath);


    try {
      await fs.unlink(localpath);
    } catch (unlinkErr) {
      console.warn("Failed to delete local file:", unlinkErr.message);
    }
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    try {
      await fs.unlink(localpath);
    } catch (unlinkErr) {
      console.warn("Failed to delete local file after error:", unlinkErr.message);
    }

    return null;
  }
};

export default UploadImage;
