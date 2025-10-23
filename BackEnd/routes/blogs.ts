import { Router } from "express";
import {type Request, type Response, type NextFunction } from "express";
import { addNewBlog, getListOfBlogs, updateBlog, deleteBlog, getOneBlog } from "../controllers/blogs";
import  {resizeImage}  from "../middlewares/resizeImage";
import multer from "multer";
import fs from "fs"
import type { RequestHandler } from "express";


const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = file.originalname.split(".").pop();
    const baseName = file.originalname.split(".")[0];
    const newFileName = `${baseName}_${timestamp}.${ext}`;
    cb(null, newFileName);
  }
});

// Allowed extensions
const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 }, // 200 KB
  fileFilter: function (req, file, cb) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only .jpg, .jpeg, .png, and .gif image files are allowed!"));
    }
    cb(null, true);
  }
});

const router = Router();

router.get("/all", getListOfBlogs);
router.get("/:blogId", getOneBlog);

const uploadMiddleware: RequestHandler = (req, res, next) => {
  upload.single("img")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: err.message });
      return;
    } else if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log("📸 File uploaded:", req.file?.filename);
    next();
  });
};



router.post("/add", uploadMiddleware, resizeImage, addNewBlog);

router.put("/:blogId", uploadMiddleware, resizeImage, updateBlog);


router.delete("/:blogId", deleteBlog);

export default router;
