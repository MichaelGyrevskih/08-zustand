"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface NotesClientProps {
  initialData: Awaited<ReturnType<typeof fetchNotes>>;
  tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

    useQuery({
  queryKey: ["notes", { tag, page, perPage }],
  queryFn: () => fetchNotes({ page, perPage, ...(tag ? { tag } : {}) }),
  initialData: page === 1 ? initialData : undefined,
  placeholderData: (prev) => prev,
});


  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <SearchBox onSearch={setSearch} />
        <Link href="/notes/action/create" style={{ 
          padding: "8px 16px", 
          backgroundColor: "#007bff", 
          color: "white", 
          textDecoration: "none", 
          borderRadius: "4px",
          border: "none",
          cursor: "pointer"
        }}>
          Create note +
        </Link>
      </div>

      <NoteList search={search} page={page} perPage={perPage} />

      <Pagination currentPage={page} onPageChange={setPage} />
    </>
  );
}

