import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";

interface EditNotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditNotePage({ params }: EditNotePageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Edit Note</h1>
      <HydrationBoundary state={dehydratedState}>
        <NoteForm noteId={id} />
      </HydrationBoundary>
    </main>
  );
}
