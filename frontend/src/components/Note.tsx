import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, author, assignedTo, createdAt, updatedAt } = note;
  return (
    <Card className={styles.noteCard}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <Card.Footer className="text-muted">
          <span>Author: {author}</span>
          <span style={{ marginLeft: "20px" }}>AssignedTo: {assignedTo}</span>
          <span style={{ marginLeft: "20px" }}>Created at: {createdAt}</span>
          <span style={{ marginLeft: "20px" }}>Update at: {updatedAt}</span>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Note;
