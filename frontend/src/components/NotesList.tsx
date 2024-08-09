import { NoteModal } from "../models/NoteModal";
import Note from "./Note";

interface NotesListProps {
    notes: NoteModal[],
    onDeleteClicked: (note: NoteModal) => void,
    onNoteClicked: (note: NoteModal) => void,
}


const NotesList = ({ notes, onDeleteClicked, onNoteClicked }: NotesListProps) => {
    return (
        <>
            {notes.map((note) => {
                return <Note
                    key={note._id}
                    note={note}
                    onNoteClicked={(note) => onNoteClicked(note)}
                    onDeleteClicked={(note) => onDeleteClicked(note)}
                />
            })}
        </>
    )
};

export default NotesList;