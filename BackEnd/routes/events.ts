import { Router } from "express";
import { getListOfEvents, getOneEvent, addNewEvent, updateEvent, deleteEvent } from "../controllers/events";
import multer from "multer";
import fs from "fs"

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

router.get("/all", getListOfEvents);
router.get("/:eventId", getOneEvent);

router.post(
  "/add",
  (req, res, next) => {
    upload.single("img")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  addNewEvent
);

router.patch(
  "/:eventId",
  (req, res, next) => {
    upload.single("img")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  updateEvent
);


router.delete("/:eventId", deleteEvent);

export default router;
