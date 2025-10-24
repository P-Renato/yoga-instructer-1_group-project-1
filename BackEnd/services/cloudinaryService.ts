import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath: string): Promise<string> => {
  try {
    console.log('📤 Uploading to Cloudinary:', filePath);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'yoga-blog',
      resource_type: 'image'
    });
    
    console.log('✅ Cloudinary upload successful:', result.secure_url);
    
    // Delete the local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('🗑️ Local file deleted:', filePath);
    }
    
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};