import React from 'react';
import { fetchNoteById } from '@/lib/api'; 
import Modal from '@/components/Modal/Modal'; 
import css from './NotePreview.module.css'; 

interface NotePreviewProps {
  noteId: string;
}

export default async function NotePreview({ noteId }: NotePreviewProps) {
  
  const note = await fetchNoteById(noteId);

  if (!note) {
    return (
      <Modal>
        <div className={css.errorContainer}>
          <h2 className={css.errorTitle}>Error 404</h2>
          <p>Note with ID: {noteId} not found.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className={css.previewContainer}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {note.createdAt}</p>
      </div>
    </Modal>
  );
}