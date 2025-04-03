import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config();
    cloudinary.config({ 
        cloud_name: 'dexdtmixn', 
        api_key: CLOUD_API_KEY, 
        api_secret: CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image

    const UploadImagetoCloudinary=async(filepath,public_id,folder)=>{
    try {
     if(!file)throw new Error("file required");
     const uploadResult = await cloudinary.uploader
       .upload(
           filepath, {
              public_id,
              folder
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    fs.unlink(file);
    return uploadResult.secure_url;  
    } catch (error) {
     return null;    
    }
    }

    export default UploadImagetoCloudinary
     