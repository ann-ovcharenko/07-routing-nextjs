import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes, FetchNotesParams } from "@/lib/api";
import FilteredNotesClient from "./FilteredNotesClient";

interface NoteFilterPageProps {
  params: {
    tag: string[];
  };
}

const defaultParams: Omit<FetchNotesParams, "tag"> = {
  page: 1,
  perPage: 10,
  search: "",
};

export default async function NoteFilterPage({ params }: NoteFilterPageProps) {
  const filterTag = params.tag?.[0] || "all";
  const tagToFetch = filterTag !== "all" ? filterTag : undefined;

  const apiParams: FetchNotesParams = {
    ...defaultParams,
    page: 1,
    tag: tagToFetch,
  };

  const queryClient = new QueryClient();

  const notesData = await queryClient.fetchQuery({
    queryKey: ["notes", apiParams],
    queryFn: () => fetchNotes(apiParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FilteredNotesClient
        initialParams={{
          ...apiParams,
          tag: filterTag,
          data: notesData,
        }}
      />
    </HydrationBoundary>
  );
}
