import express from "express";
import * as NoteApi from "../controllers/notesApi";

const noteRoutes = express.Router();

noteRoutes.get("/", NoteApi.getNotes);
noteRoutes.get("/:noteId", NoteApi.getNote);
noteRoutes.post("/", NoteApi.createNote);
noteRoutes.patch("/:noteId", NoteApi.updateNote);
noteRoutes.delete("/:noteId", NoteApi.deleteNote);

export default noteRoutes;