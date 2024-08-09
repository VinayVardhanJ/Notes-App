import axios from "axios";
import { NoteModal } from "../models/NoteModal";

const isProduction = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
const url = isProduction ? process.env.REACT_APP_PRODUCTION_URL : "http://localhost:5000";

export const deleteNote = async (noteId: string) => {
    await axios.delete(`${url}/api/notes/` + noteId);
};

export interface NoteInput {
    title?: string,
    text?: string,
};

export const createNote = async (note: NoteInput): Promise<NoteModal> => {
    const response = await axios.post(`${url}/api/notes`, note);
    return response.data;
};

export const updateNote = async (noteId: string, note: NoteInput): Promise<NoteModal> => {
    const response = await axios.patch(`${url}/api/notes/` + noteId, note);
    return response.data;
};