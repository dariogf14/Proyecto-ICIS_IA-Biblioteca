import Link from "next/link";

export default function HomePage() {
  return (
    <section className="card hero">
      <h1>Gestion de Biblioteca</h1>
      <p>Aplicacion para controlar libros, socios, prestamos e historial de actividad.</p>
      <div className="actions">
        <Link className="button" href="/books">Gestionar libros</Link>
        <Link className="button secondary" href="/loans">Registrar prestamo</Link>
      </div>
    </section>
  );
}
