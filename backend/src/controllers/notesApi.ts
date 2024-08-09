import { RequestHandler } from "express";
import NoteModal from "../models/NoteModal";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModal.find().exec();
        return res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    
    const noteId = req.params.noteId;

    try {
        if (!isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note Id");
        }
        const note = await NoteModal.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not Found");
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface createNoteBody {
    title?: string,
    text?: string
}

export const createNote: RequestHandler<unknown, unknown, createNoteBody, unknown> = async (req, res, next) => {
    
    const title = req.body.title;
    const text = req.body.text;
    
    try {
        if (!title){
            createHttpError(400, "Note must have a title");
        }
        const newNote = await NoteModal.create({
            title: title,
            text: text,
        })
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface updateNoteParam {
    noteId?: string
}

interface updateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<updateNoteParam, unknown, updateNoteBody, unknown> = async (req, res, next) => {
    
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if(!isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note Id");
        }
        if (!newTitle) {
            throw createHttpError(400, "Note must have Title");
        }
        const note = await NoteModal.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not Found");
        }
        note.title = newTitle;
        note.text = newText;
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);   
    }
};

interface deleteNoteParam {
    noteId?: string
}

export const deleteNote: RequestHandler<deleteNoteParam, unknown, unknown, unknown> = async (req, res, next) => {

    const noteId = req.params.noteId;

    try {
        if(!isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note Id");
        }
        const note = await NoteModal.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not Found");
        }
        await note.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};