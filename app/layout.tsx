/* @ts-nocheck */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { type ReactNode } from "react";

// Використовуємо inline анотацію типу в сигнатурі функції
export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "NoteHub",
  description:
    "A simple note-taking application built with Next.js and TanStack Query.",
};
