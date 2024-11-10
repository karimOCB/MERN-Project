import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, select: false, unique: true },
    password: { type: String, required: true, select: false },
  },
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
