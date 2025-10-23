import {type Request, type Response, type NextFunction } from "express";
import { ReadDb, WriteDb } from "./ReadWriteFunction";


export const getListOfBlogs = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Reading blogs data...');
        const rawData = ReadDb();
        console.log('Raw data:', rawData);
        
        const blogsData = JSON.parse(rawData);
        console.log('Parsed data keys:', Object.keys(blogsData));
        console.log('Blogs array:', blogsData.blog);
        
        res.json(blogsData.blog.slice(-5)); 
    } catch (err: any) {
        console.error('Error in getListOfBlogs:', err);
        res.status(500).json({ error: "Failed to fetch blogs: " + err.message });
    }
};

export const getOneBlog = (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogsData = JSON.parse(ReadDb());
        const id = parseInt(req.params.blogId);
        const oneBlog = blogsData.blog.find((o: any) => o.id === id)
        res.json(oneBlog); 
    } catch (err) {
        next(err);
    }
}

export const addNewBlog = (req: Request, res: Response, next: NextFunction)=> {
  try {
    const blogsData = JSON.parse(ReadDb());

    if (!Array.isArray(blogsData.blog)) {
      res.status(500).json({ error: "Database format error. Expected 'blog' to be an array." });
      return;
    }

    const newId = blogsData.blog.length + 1;
    const day = new Date().toLocaleDateString('de-DE');
    const { title, content, category } = req.body;
    const img = req.file ? req.file.filename : ""; // ✅ Get uploaded file name from multer

    const newBlog = {
      id: newId,
      title,
      content,
      createdDay: day,
      category,
      img,
    };

    blogsData.blog.push(newBlog);
    WriteDb(blogsData);

    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
    return;
  } catch (err) {
    next(err);
  }
};


export const updateBlog = (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogsData = JSON.parse(ReadDb());
    const id = parseInt(req.params.blogId);
    const { title, content, category, createdDay } = req.body;

    const existingBlog = blogsData.blog.find((b: any) => b.id === id);
    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    const img = req.file ? req.file.filename : existingBlog.img;

    const updatedBlog = {
      id,
      title: title ?? existingBlog.title,
      content: content ?? existingBlog.content,
      category: category ?? existingBlog.category,
      createdDay: createdDay ?? existingBlog.createdDay,
      img,
    };

    blogsData.blog = blogsData.blog.map((b: any) =>
      b.id === id ? updatedBlog : b
    );

    WriteDb(blogsData);
    res.status(200).json({ message: "Blog edited successfully", blog: updatedBlog });

  } catch (error) {
    next(error);
  }
};



export const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
    const blogsData = JSON.parse(ReadDb());
    const id = parseInt(req.params.blogId);
    blogsData.blog = blogsData.blog.filter((b: any)=> b.id !== id)
    WriteDb(blogsData)
    res.status(201).json({message: "This post of blog is deleted successful"})
}