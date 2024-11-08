import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import styles from "./styles/NotePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button
        onClick={() => setShowAddNoteDialogue(true)}
        className={`mb-4 ${stylesUtils.blockCenter}`}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialogue && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialogue(false)}
          onNoteSaved={(newNote) => {
            setShowAddNoteDialogue(false);
            setNotes([...notes, newNote]);
          }}
        />
      )}
    </Container>
  );
}

export default App;
