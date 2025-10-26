"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  initialData: Awaited<ReturnType<typeof fetchNotes>>;
  tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </div>

      <NoteList search={search} page={page} perPage={perPage} />

      <Pagination currentPage={page} onPageChange={setPage} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

