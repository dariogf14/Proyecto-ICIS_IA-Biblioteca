import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Biblioteca Municipal",
  description: "Gestion de biblioteca"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="header">
          <Link href="/">Biblioteca Municipal</Link>
          <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/books">Libros</Link>
            <Link href="/members">Socios</Link>
            <Link href="/loans">Prestamos</Link>
            <Link href="/logs">Historial</Link>
            <Link href="/about">Ayuda</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
