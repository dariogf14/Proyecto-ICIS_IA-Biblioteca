"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // funcion para cargar resumen
    fetch("/api/stats").then(res => res.json()).then(setStats);
  }, []);

  if (!stats) return <section className="card"><h1>Dashboard</h1><p>Cargando...</p></section>;

  return (
    <section className="card">
      <h1>Dashboard</h1>
      <p className="small">Resumen general de la biblioteca.</p>
      <div className="grid">
        <article className="card"><h2>{stats.books}</h2><p>Libros totales</p></article>
        <article className="card"><h2>{stats.available}</h2><p>Libros disponibles</p></article>
        <article className="card"><h2>{stats.members}</h2><p>Socios registrados</p></article>
        <article className="card"><h2>{stats.activeLoans}</h2><p>Prestamos activos</p></article>
        <article className="card"><h2>{stats.logs}</h2><p>Registros MongoDB</p></article>
      </div>
      {stats.activeLoans > 0 && <div className="notice">Hay prestamos activos pendientes de devolucion.</div>}
    </section>
  );
}
