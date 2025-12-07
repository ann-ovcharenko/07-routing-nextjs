export type NoteTag = string;

export interface Note {
    id: string; 
    title: string;
    content: string;
    tag: NoteTag; 
    createdAt: string;
    updatedAt: string;
}

export type NoteCreationData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
