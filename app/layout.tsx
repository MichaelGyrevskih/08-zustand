import "./globals.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Header />
      <body>
        <TanStackProvider>{children}</TanStackProvider>
        <div id="modal-root"></div>
      </body>
      <Footer />
    </html>
  );
}
