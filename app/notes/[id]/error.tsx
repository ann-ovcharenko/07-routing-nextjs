"use client";

import { FC } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const NoteDetailsErrorPage: FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={() => reset()}>Спробувати знову</button>
    </div>
  );
};

export default NoteDetailsErrorPage;
