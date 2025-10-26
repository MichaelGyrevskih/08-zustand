import { fetchNotes } from "@/lib/api";
import NotesClient from "../../Notes.client";

interface Params {
  params: { tag?: string[] };
}

export default async function FilteredNotesPage({ params }: Params) {
  const tagParam = params.tag?.[0];
  const tag = tagParam === "all" ? undefined : tagParam;

  const notes = await fetchNotes({ page: 1, perPage: 6, ...(tag ? { tag } : {}) });

  return <NotesClient initialData={notes} tag={tag} />;
}
