"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import StatusLoader from "@/components/StatusLoader/StatusLoader";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.client.module.css";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <StatusLoader message="Завантаження нотатки..." />}

      {isError && (
        <div className={css.errorContainer}>
          <h2>Помилка</h2>
          <p>Не вдалося завантажити нотатку з ID: {id}</p>
        </div>
      )}

      {!isLoading && note && <NotePreview note={note} />}
    </Modal>
  );
}
