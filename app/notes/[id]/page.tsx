import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = params;
  const note = await fetchNoteById(id);
  
  const title = note.title || "Untitled Note";
  const description = note.content 
    ? `${note.content.substring(0, 160)}${note.content.length > 160 ? "..." : ""}`
    : `View and manage your ${note.tag.toLowerCase()} note in NoteHub.`;

  return {
    title: `${title} | NoteHub`,
    description: description,
    openGraph: {
      title: `${title} | NoteHub`,
      description: description,
      url: `https://notehub.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${title}`,
        },
      ],
    },
  };
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
