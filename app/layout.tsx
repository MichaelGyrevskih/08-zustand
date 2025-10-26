import "./globals.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub - Your Personal Note Management App",
  description: "NoteHub is a powerful and intuitive note-taking application that helps you organize your thoughts, tasks, and ideas efficiently. Create, manage, and categorize your notes with ease.",
  openGraph: {
    title: "NoteHub - Your Personal Note Management App",
    description: "NoteHub is a powerful and intuitive note-taking application that helps you organize your thoughts, tasks, and ideas efficiently. Create, manage, and categorize your notes with ease.",
    url: "https://notehub.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Note Management App",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Header />
        <TanStackProvider>{children}</TanStackProvider>
        <div id="modal-root"></div>
        <Footer />
      </body>
    </html>
  );
}
