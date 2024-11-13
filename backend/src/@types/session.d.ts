import mongoose from "mongoose";
import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}