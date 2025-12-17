import React from 'react';
import Modal from '@/components/Modal/Modal';
import NoteEditForm from '@/components/NoteEditForm/NoteEditForm'; 

interface EditNoteModalPageProps {
  params: {
    id: string; 
  };
}

export default function EditNoteModalPage({ params }: EditNoteModalPageProps) {
    const { id: noteId } = params;

    if (!noteId) {
        return (
            <Modal>
                <p>Error: Note ID not found.</p>
            </Modal>
        );
    }

    return (
        <Modal>
            <NoteEditForm noteId={noteId} />
        </Modal>
    );
}