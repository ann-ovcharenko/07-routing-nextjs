import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

export const metadata = {
  title: "NoteHub NextJS App",
  description: "A notes application refactored to Next.js App Router.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          <Header />
          <main style={{ minHeight: '80vh' }}>{children}</main> 
          <Footer />
        </TanStackProvider>
        <div id="modal-root" /> 
      </body>
    </html>
  );
}
