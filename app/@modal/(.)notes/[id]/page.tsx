import NotePreviewClient from "./NotePreview.client";

interface ModalPageProps {
  params: {
    id: string;
  };
}

export default function NoteModalPage({ params }: ModalPageProps) {
  return <NotePreviewClient id={params.id} />;
}
