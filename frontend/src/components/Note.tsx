import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, author, assignedTo, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated at: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created at: ${formatDate(createdAt)}`;
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <span>Author: {author}</span>
        <span style={{ marginLeft: "20px" }}>AssignedTo: {assignedTo}</span>
        <span style={{ marginLeft: "20px" }}>{createdUpdatedText}</span>
      </Card.Footer>
    </Card>
  );
};

export default Note;
