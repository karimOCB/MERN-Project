import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";

const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://mern-project-zxtv.onrender.com"
    : "http://localhost:5000";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else if (response.status === 400) {
      throw new BadRequestError(errorMessage);
    } else {
      throw Error(
        "Request failed: " + response.status + " message" + errorMessage
      );
    }
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData(`${backendUrl}/api/notes`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
  author: string;
  assignedTo: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData(`${backendUrl}/api/notes`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`${backendUrl}/api/notes/${noteId}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(`${backendUrl}/api/notes/${noteId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(`${backendUrl}/api/users`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(`${backendUrl}/api/users/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData(`${backendUrl}/api/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData(`${backendUrl}/api/users/logout`, {
    credentials: "include",
    method: "POST",
  });
}
