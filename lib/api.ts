import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || 'test-token'}`
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

interface FetchData {
  results: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Получение списка заметок
export const fetchNotes = async ({page = 1,perPage = 6,search = "",}:FetchNotesParams) => {
  const { data } = await api.get("/notes", {
    params: { page, perPage, search },
  });
  return data as FetchData;
};

// Создание новой заметки
export const createNote = async (note: CreateNoteDto) => {
  const { data } = await api.post("/notes", note);
  return data as Note;
};

// Обновление заметки
export const updateNote = async (id: string, note: Partial<CreateNoteDto>) => {
  const { data } = await api.patch(`/notes/${id}`, note);
  return data as Note;
};

// Удаление заметки
export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
  return id;
};


export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data as Note;
};


export const fetchNotesByTag = async ({ tag }: { tag?: string }) => {
  const params = tag ? { tag } : {};
  const { data } = await api.get("/notes", { params });
  return data as FetchData;
};
