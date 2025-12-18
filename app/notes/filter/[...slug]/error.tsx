"use client";

import React from "react";
import StatusError from "@/components/StatusError/StatusError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <StatusError message={error.message || "Помилка завантаження фільтрів"} />
      <button
        onClick={() => reset()}
        style={{ marginTop: "15px", padding: "8px 16px", cursor: "pointer" }}
      >
        Спробувати знову
      </button>
    </div>
  );
}
