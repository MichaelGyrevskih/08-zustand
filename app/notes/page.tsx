import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const initial = await fetchNotes({ page: 1, perPage: 6, search: "" });

  return (
    <main>
      <NotesClient initialData={initial} />
    </main>
  );
}
