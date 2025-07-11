import { Router } from "express";
import { addNewBlog, getListOfBlogs, updateBlog, deleteBlog, getOneBlog } from "../controllers/blogs";

const router = Router();

// Get all blogs
router.get("/all", getListOfBlogs);
router.get("/:blogId",getOneBlog)

// Add new blog
router.post("/add", addNewBlog);

// Update a blog by ID
router.patch("/:blogId", updateBlog);

// Delete a blog by ID
router.delete("/:blogId", deleteBlog)

export default router;
