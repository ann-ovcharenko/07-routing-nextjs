import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { children, modal } = props;

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
