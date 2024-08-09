import { Button, Card } from "react-bootstrap";
import { NoteModal } from "../models/NoteModal";
import { FormatDate } from "../utility/FormatDate";

interface NoteProps {
    note: NoteModal,
    onNoteClicked: (note: NoteModal) => void,
    onDeleteClicked: (note: NoteModal) => void,
}

const Note = ({ note, onNoteClicked, onDeleteClicked }: NoteProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    let createdUpdatedText;
    if (updatedAt > createdAt) {
        createdUpdatedText = `Updated at : ${FormatDate(updatedAt)}`;
    } else {
        createdUpdatedText = `Created at : ${FormatDate(createdAt)}`;
    }

    return (
        <Card onClick={() => onNoteClicked(note)} className="ms-auto mt-2" style={{ backgroundColor: "#fffbe0", cursor: "pointer" }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {createdUpdatedText}
                <Button variant="danger" style={{ width: 200 }}
                    onClick={(e) => {
                        onDeleteClicked(note)
                        e.stopPropagation()
                    }}>
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    )
};

export default Note;