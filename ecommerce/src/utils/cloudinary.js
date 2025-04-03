import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config();
    cloudinary.config({ 
        cloud_name: 'dexdtmixn', 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image

    const UploadImagetoCloudinary=async(filepath,public_id,folderpath)=>{
    try {
     if(!filepath)throw new Error("filepath is  required");
     const uploadResult = await cloudinary.uploader
       .upload(
           filepath, {
              public_id:public_id,
              folder:folderpath
           }
       );
       if(fs.existsSync(filepath))fs.unlinkSync(filepath);
     
    return uploadResult.secure_url;  
    } catch (error) {
     fs.unlink(filepath);
     return null;    
    }
    }

    const destroyImages = async (folderPath) => {
        try {
          const existingImages = await cloudinary.api.resources({
            type: "upload",
            prefix: folderPath, // Get all images inside this folder
          });
      
          for (const image of existingImages.resources) {
            await cloudinary.uploader.destroy(image.public_id);
          }
        } catch (error) {
          console.error("Error deleting images:", error);
        }
      };
      

    export {UploadImagetoCloudinary,destroyImages};
     