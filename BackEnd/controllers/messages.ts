import { Request, Response, NextFunction } from "express";
import { ReadDb, WriteDb } from "./ReadWriteFunction";

export const getListOfMes = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = JSON.parse(ReadDb());

        if (!Array.isArray(db.messages)) {
            db.messages = [];
        }

        // Just return the list, don't modify
        res.json(db.messages);
    } catch (err) {
        next(err);
    }
};

export const addMessage = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = JSON.parse(ReadDb());

        if (!Array.isArray(db.messages)) {
            db.messages = [];
        }

        const newMessage = {
            id: db.messages.length + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
            createdAt: new Date().toISOString(),
        };

        db.messages.push(newMessage);
        WriteDb(db);

        res.status(201).json({ message: "Message saved successfully!", data: newMessage });
    } catch (err) {
        next(err);
    }
};

export const getOneMes = (req: Request, res: Response, next: NextFunction) => {
    // can implement later
};

export const deleteMes = (req: Request, res: Response, next: NextFunction) => {
    // can implement later
};
