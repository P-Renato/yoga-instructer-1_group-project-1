import sharp from "sharp";
import path from "path";
import fs from "fs";
import { type Request, type Response, type NextFunction } from "express";
import { uploadToCloudinary } from "../services/cloudinaryService";

export const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    console.log("❌ No file uploaded!");
    return next(); // no image in this request
  }

  console.log("✅ File uploaded:", req.file.filename);

  const inputPath = path.resolve(req.file.path); // original uploaded image
  const outputPath = path.resolve(req.file.destination, `resized_${req.file.filename}`);

  try {
    await sharp(inputPath)
      .resize(800, 600, { fit: "cover" }) // <-- force same size
      .toFile(outputPath);

    console.log("🎉 Image resized successfully:", outputPath);

    // replace original file with resized one
    fs.unlinkSync(inputPath);
    const cloudinaryUrl = await uploadToCloudinary(outputPath);
    req.body.cloudinaryImageUrl = cloudinaryUrl;

    console.log("☁️ Image uploaded to Cloudinary:", cloudinaryUrl);

    next();
  } catch (err) {
    console.error("🔥 Error resizing image:", err);
    next(err);
  }
};
