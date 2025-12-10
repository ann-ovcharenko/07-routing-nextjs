import React from "react";
import css from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className={css.link}>
        Go to Homepage
      </a>
    </main>
  );
}
