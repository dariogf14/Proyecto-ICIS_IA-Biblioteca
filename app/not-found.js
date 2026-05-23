import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card">
      <h1>Pagina no encontrada</h1>
      <p>La ruta solicitada no existe.</p>
      <Link className="button" href="/">Volver al inicio</Link>
    </div>
  );
}
