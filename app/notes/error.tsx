"use client";

import React, { FC, useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const NotesErrorPage: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error("Помилка завантаження нотаток:", error);
  }, [error]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Щось пішло не так при завантаженні нотаток! 😞</h2>
      <p style={{ color: "#dc3545", margin: "15px 0" }}>
        Деталі: {error.message}
      </p>

      <button
        onClick={() => reset()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0d6efd",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Спробувати завантажити знову
      </button>
    </div>
  );
};

export default NotesErrorPage;
