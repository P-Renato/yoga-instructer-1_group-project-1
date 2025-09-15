import { Request, Response, NextFunction } from "express";
import { ReadDb, WriteDb } from "./ReadWriteFunction";


export const getListOfInfos = (req: Request, res: Response, next: NextFunction) => {
    try {
        const infosData = JSON.parse(ReadDb());
        res.json(infosData.info); 
    } catch (err) {
        next(err);
    }
};

export const getOneInfo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const infosData = JSON.parse(ReadDb());
    const id = parseInt(req.params.infoId);
    const oneInfo = infosData.info.find((o) => o.id === id);

    if (!oneInfo) {
      return res.status(404).json({ error: "Info not found" });
    }

    res.status(200).json(oneInfo);
  } catch (err) {
    next(err);
  }
};


export const addNewInfo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const infosData = JSON.parse(ReadDb());

    if (!Array.isArray(infosData.info)) {
      return res.status(500).json({ error: "Database format error. Expected 'info' to be an array." });
    }

    const newId = infosData.info.length + 1;
    const day = new Date().toLocaleDateString('de-DE');
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content field is required." });
    }

    const newInfo = {
      id: newId,
      content,
      createdDay: day,
    };

    infosData.info.push(newInfo);
    WriteDb(infosData);

    res.status(201).json({ message: "Info added successfully", event: newInfo });
  } catch (err) {
    console.error("Server error in addNewInfo:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};



export const updateInfo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const infosData = JSON.parse(ReadDb());
    const id = parseInt(req.params.infoId);
    const {content, createdDay } = req.body;

    const existingInfo = infosData.info.find((b: any) => b.id === id);
    if (!existingInfo) {
      return res.status(404).json({ message: "Information not found" });
    }

    const updatedInfo = {
      id,
      content: content ?? existingInfo.content,
      createdDay: createdDay ?? existingInfo.createdDay
    };

    infosData.info = infosData.info.map((b: any) =>
      b.id === id ? updatedInfo : b
    );

    WriteDb(infosData);
    res.status(200).json({ message: "Information edited successfully", info: updatedInfo });

  } catch (error) {
    next(error);
  }
};



export const deleteInfo = (req: Request, res: Response, next: NextFunction) => {
    const infosData = JSON.parse(ReadDb());
    const id = parseInt(req.params.infoId);
    infosData.info = infosData.info.filter((b)=> b.id !== id)
    WriteDb(infosData)
    res.status(201).json({message: "This post of information is deleted successful"})
}