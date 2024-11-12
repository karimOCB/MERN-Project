import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    author: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    assignedTo: { type: String, required: true },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
