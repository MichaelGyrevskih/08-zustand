import { fetchNotes } from "@/lib/api";
import NotesClient from "../../Notes.client";
import type { Metadata } from "next";

interface Params {
  params: { tag?: string[] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const tagParam = params.tag?.[0];
  const tag = tagParam === "all" ? undefined : tagParam;
  const filterTitle = tag ? `${tag} Notes` : "All Notes";
  const filterDescription = tag 
    ? `Browse and manage all your ${tag.toLowerCase()} notes in NoteHub. Stay organized and productive.`
    : "Browse and manage all your notes in NoteHub. Stay organized and productive with our comprehensive note management system.";

  return {
    title: `${filterTitle} | NoteHub`,
    description: filterDescription,
    openGraph: {
      title: `${filterTitle} | NoteHub`,
      description: filterDescription,
      url: `https://notehub.app/notes/filter/${tag || "all"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${filterTitle}`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Params) {
  const tagParam = params.tag?.[0];
  const tag = tagParam === "all" ? undefined : tagParam;

  const notes = await fetchNotes({ page: 1, perPage: 6, ...(tag ? { tag } : {}) });

  return <NotesClient initialData={notes} tag={tag} />;
}
