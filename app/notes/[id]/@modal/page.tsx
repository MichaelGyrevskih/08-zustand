import { fetchNoteById } from "@/lib/api";
import NotePreview from "../NotePreview";

interface Params {
  params: { id: string };
}

export default async function ModalSlot({ params }: Params) {
  const { id } = params;
  const initialNote = await fetchNoteById(id);

  return <NotePreview id={id} />;
}
