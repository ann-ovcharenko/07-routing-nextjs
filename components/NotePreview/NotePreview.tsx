"use client";

import React from "react";
import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

const NotePreview: React.FC<NotePreviewProps> = ({ note }) => {
  return (
    <div className={css.previewContainer}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NotePreview;
