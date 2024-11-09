import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import styles from "./styles/NotePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Container className={styles.notesPage}>
      <Button
        onClick={() => setShowAddNoteDialogue(true)}
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
              {notes.map((note) => (
                <Col key={note._id}>
                  <Note
                    note={note}
                    onNoteClicked={(note) => setNoteToEdit(note)}
                    onDeleteNoteClicked={deleteNote}
                    className={styles.note}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className={stylesUtils.flexCenter}>
              You don't have any notes yet
            </p>
          )}
        </>
      )}
      {showAddNoteDialogue && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialogue(false)}
          onNoteSaved={(newNote: NoteModel) => {
            setShowAddNoteDialogue(false);
            setNotes([...notes, newNote]);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote: NoteModel) => {
            setNoteToEdit(null);
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
          }}
        />
      )}
    </Container>
  );
}

export default App;
