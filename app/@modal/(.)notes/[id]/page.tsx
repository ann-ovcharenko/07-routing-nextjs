import NotePreview from '@/components/NotePreview/NotePreview';

interface ModalPageProps {
  params: {
    id: string; 
  };
}

export default function NoteModalPage({ params }: ModalPageProps) {
  const { id } = params;

  return <NotePreview noteId={id} />;
}