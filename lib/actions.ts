"use server";

import { createNote } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CreateNoteDto } from "@/lib/api";

export async function createNoteAction(formData: FormData) {
  const noteData: CreateNoteDto = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    tag: formData.get("tag") as CreateNoteDto["tag"],
  };

  try {
    await createNote(noteData);
    revalidatePath("/notes");
    redirect("/notes");
  } catch (error) {
    console.error("Failed to create note:", error);
    throw new Error("Failed to create note");
  }
}
