import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Params {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Params) {
  const { id } = params;
  const initial = await fetchNoteById(id);

  return (
    <main>
      <NoteDetailsClient initialNote={initial} />
    </main>
  );
}
