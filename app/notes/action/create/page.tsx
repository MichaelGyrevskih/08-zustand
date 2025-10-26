import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub. Organize your thoughts, tasks, and ideas with our intuitive note-taking application.",
  url: "https://notehub.app/notes/action/create",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub. Organize your thoughts, tasks, and ideas with our intuitive note-taking application.",
    url: "https://notehub.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Create Note",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
