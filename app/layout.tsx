import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import React from "react";

interface LayoutProps extends React.PropsWithChildren {
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
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
