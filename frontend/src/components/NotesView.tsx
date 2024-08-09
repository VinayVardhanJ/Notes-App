import axios from "axios";
import { useEffect, useState } from "react";
import { NoteModal } from "../models/NoteModal";
import { Button, Container } from "react-bootstrap";
import NotesList from "./NotesList";
import { deleteNote } from "../network/Note_api";
import AddUpdateForm from "./AddUpdateForm";

const isProduction = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
const url = isProduction ? process.env.REACT_APP_PRODUCTION_URL : "http://localhost:5000";

const NotesView = () => {

    const [notes, setNotes] = useState<NoteModal[]>([])
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModal | null>(null);

    useEffect(() => {
        async function loadNotes() {
            const res = await axios.get(`${url}/api/notes`);
            setNotes(res.data);
        }
        loadNotes();
    }, []);

    const deletenote = async (note: NoteModal) => {
        try {
            await deleteNote(note._id);
            setNotes(notes.filter(exisitingNote => exisitingNote._id !== note._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    const noteClicked = (note: any) => {
        setShowUpdateModal(true);
        setNoteToEdit(note);
    };

    return (
        <>
            <Container className='ms-auto mt-3'>
                <Button
                    variant='primary'
                    onClick={() => setShowAddModal(true)}
                >Add Note</Button>
                <NotesList
                    notes={notes}
                    onDeleteClicked={(note) => deletenote(note)}
                    onNoteClicked={(note) => noteClicked(note)}
                />
            </Container>
            {
                showAddModal &&
                <AddUpdateForm
                    onDismiss={() => setShowAddModal(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddModal(false);
                    }}
                />
            }

            {
                showUpdateModal && noteToEdit &&
                <AddUpdateForm
                    onDismiss={() => setShowUpdateModal(false)}
                    noteToEdit={noteToEdit}
                    onNoteSaved={(updatedNote) => {
                        setNotes(notes.map(
                            note => note._id === updatedNote._id
                                ? updatedNote
                                : note
                        ))
                        setShowUpdateModal(false)
                        setNoteToEdit(null)
                    }}
                />
            }
        </>
    )
};

export default NotesView;