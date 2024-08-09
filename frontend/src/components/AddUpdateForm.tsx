import { Button, Form, Modal } from "react-bootstrap"
import { NoteModal } from "../models/NoteModal";
import { useForm } from "react-hook-form";
import { NoteInput, createNote, updateNote } from "../network/Note_api";

interface AddUpdateFormProps {
    onDismiss: () => void,
    noteToEdit?: NoteModal,
    onNoteSaved: (note: NoteModal) => void,
};

const AddUpdateForm = ({ onDismiss, noteToEdit, onNoteSaved }: AddUpdateFormProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || '',
            text: noteToEdit?.text || ''
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: NoteModal;
            if(noteToEdit) {
                noteResponse = await updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        noteToEdit
                            ? "Update Note"
                            : "Add Note"
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", {required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default AddUpdateForm;