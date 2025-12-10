"use client";

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteNote } from '@/lib/api'; 
import css from './DeleteNoteButton.module.css'; 

interface DeleteNoteButtonProps {
    noteId: string;
}

const DeleteNoteButton: React.FC<DeleteNoteButtonProps> = ({ noteId }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            router.back(); 
        },

        onError: (error) => {
            console.error("Помилка при видаленні нотатки:", error);
            alert(`Помилка: ${(error as Error).message}. Спробуйте ще раз.`);
        },
    });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
            deleteMutation.mutate(noteId);
        }
    };

    const isPending = deleteMutation.isPending;

    return (
        <button 
            onClick={handleDelete} 
            className={css.deleteButton}
            disabled={isPending}
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    );
};

export default DeleteNoteButton;