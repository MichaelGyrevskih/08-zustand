"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Error loading note</div>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.tag}>
          <span className={css.tagLabel}>Tag:</span>
          <span className={css.tagValue}>{note.tag}</span>
        </div>
      </div>
    </Modal>
  );
}
