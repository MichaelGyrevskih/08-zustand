"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNoteAction } from "@/lib/actions";
import styles from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Загружаем draft при монтировании компонента
  useEffect(() => {
    // Draft уже загружен из Zustand store
  }, []);

  const handleInputChange = (field: keyof typeof draft, value: string) => {
    setDraft({ [field]: value });
    // Очищаем ошибку для этого поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as string;

    if (!title || title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (title && title.length > 50) {
      newErrors.title = "Title must be at most 50 characters";
    }
    if (content && content.length > 500) {
      newErrors.content = "Content must be at most 500 characters";
    }
    if (!tag) {
      newErrors.tag = "Tag is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createNoteAction(formData);
      clearDraft(); // Очищаем draft после успешного создания
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back(); // Возвращаемся на предыдущую страницу без очистки draft
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      <label>
        Title
        <input
          name="title"
          type="text"
          value={draft.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className={errors.title ? styles.error : ""}
        />
        {errors.title && <div className={styles.errorMessage}>{errors.title}</div>}
      </label>

      <label>
        Content
        <textarea
          name="content"
          value={draft.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          className={errors.content ? styles.error : ""}
        />
        {errors.content && <div className={styles.errorMessage}>{errors.content}</div>}
      </label>

      <label>
        Tag
        <select
          name="tag"
          value={draft.tag}
          onChange={(e) => handleInputChange("tag", e.target.value)}
          className={errors.tag ? styles.error : ""}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <div className={styles.errorMessage}>{errors.tag}</div>}
      </label>

      <div className={styles.buttonGroup}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Note"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}