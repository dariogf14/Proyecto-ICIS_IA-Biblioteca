export default function AboutPage() {
  return (
    <section className="card">
      <h1>Ayuda de uso</h1>
      <h2>Flujo 1: prestamo de un libro</h2>
      <p>Entra en Libros, revisa que el libro este disponible, entra en Prestamos y registra el prestamo con el socio.</p>
      <h2>Flujo 2: devolucion</h2>
      <p>Entra en Prestamos y marca el prestamo activo como devuelto. El libro vuelve a estar disponible.</p>
      <h2>Control de datos</h2>
      <p>MySQL guarda autores, categorias, libros, socios y prestamos. MongoDB guarda el historial de acciones.</p>
    </section>
  );
}
