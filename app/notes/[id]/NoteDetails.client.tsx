"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query"; 
import { fetchNoteById } from "../../../lib/api";
import { useParams } from "next/navigation";
import type { Note } from "../../../types/note";
import css from "./NoteDetails.module.css";

const NoteDetailsClient: FC = () => {
  const params = useParams();
  const noteId = params.id as string; 

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false, 
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>; 
  }

  if (error || !note) {
    return <p>Error loading note or note not found.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created date: {note.createdAt}</p> 
      </div>
    </div>
  );
};

export default NoteDetailsClient;