import { type Request, type Response, type NextFunction } from "express";
import { ReadDb, WriteDb } from "./ReadWriteFunction";

type EventList = {
  content: string;
  createdDay: string;
  id: number;
  location: string;
  title: string
}

export const getListOfEvents = (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventsData = JSON.parse(ReadDb());
        res.json(eventsData.events); 
    } catch (err) {
        next(err);
    }
};

export const getOneEvent = (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventsData = JSON.parse(ReadDb());
        const id = parseInt(req.params.eventId);
        console.log(eventsData)
        const oneEvent = eventsData.events.find((o: EventList) => o.id === id)
        res.json(oneEvent); 
    } catch (err) {
        next(err);
    }
}

export const addNewEvent = (req: Request, res: Response, next: NextFunction) => {
  try {
   const eventsData = JSON.parse(ReadDb());

    if (!Array.isArray(eventsData.events)) {
      res.status(500).json({ error: "Database format error. Expected 'blog' to be an array." });
      return;
    }

    const newId = eventsData.events.length + 1;
    const day = new Date().toLocaleDateString('de-DE');
    const { title, content, location } = req.body;
    const img = req.file ? "../uploads/"+req.file.filename : ""; // ✅ Get uploaded file name from multer

    const newEvent = {
      id: newId,
      title,
      content,
      createdDay: day,
      location,
      img,
    };

    eventsData.events.push(newEvent);
    WriteDb(eventsData);

    res.status(201).json({ message: "Event added successfully", event: newEvent });
    return;
  } catch (err) {
    next(err);
  }
};


export const updateEvent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventsData = JSON.parse(ReadDb());
    const id = parseInt(req.params.eventId);
    const { title, content, location, createdDay } = req.body;

    const existingEvent = eventsData.events.find((b: any) => b.id === id);
    if (!existingEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const img = req.file ? req.file.filename : existingEvent.img;

    const updatedEvent = {
      id,
      title: title ?? existingEvent.title,
      content: content ?? existingEvent.content,
      location: location ?? existingEvent.location,
      createdDay: createdDay ?? existingEvent.createdDay,
      img,
    };

    eventsData.events = eventsData.events.map((b: any) =>
      b.id === id ? updatedEvent : b
    );

    WriteDb(eventsData);
    res.status(200).json({ message: "Event edited successfully", blog: updatedEvent });

  } catch (error) {
    next(error);
  }
};



export const deleteEvent = (req: Request, res: Response, next: NextFunction) => {
    const eventsData = JSON.parse(ReadDb());
    const id = parseInt(req.params.eventId);
    console.log(eventsData)
    eventsData.events = eventsData.events.filter((b: EventList)=> b.id !== id)
    WriteDb(eventsData)
    res.status(201).json({message: "This post of event is deleted successful"})
}