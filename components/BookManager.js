"use client";

import { useEffect, useState } from "react";

const emptyBook = { title: "", isbn: "", year: "", authorId: "", categoryId: "", available: true };

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyBook);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ search: "", categoryId: "", available: "", year: "" });
  const [message, setMessage] = useState("");

  async function loadData() {
    // funcion para cargar datos
    const params = new URLSearchParams(filters);
    const [booksRes, authorsRes, categoriesRes] = await Promise.all([
      fetch(`/api/books?${params.toString()}`),
      fetch("/api/authors"),
      fetch("/api/categories")
    ]);
    setBooks(await booksRes.json());
    setAuthors(await authorsRes.json());
    setCategories(await categoriesRes.json());
  }

  useEffect(() => { loadData(); }, []);

  function change(event) {
    // funcion para cambiar campos
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function submit(event) {
    // funcion para guardar libro
    event.preventDefault();
    const url = editing ? `/api/books/${editing}` : "/api/books";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) return setMessage((data.errors || [data.error]).join(". "));
    setForm(emptyBook);
    setEditing(null);
    setMessage("Libro guardado correctamente");
    loadData();
  }

  function edit(book) {
    // funcion para editar libro
    setEditing(book.id);
    setForm({ title: book.title, isbn: book.isbn, year: book.year, authorId: book.authorId, categoryId: book.categoryId, available: book.available });
  }

  async function remove(id) {
    // funcion para borrar libro
    if (!confirm("Seguro que quieres borrar este libro?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <>
      <section className="card">
        <h1>Libros</h1>
        <p className="small">Listado maestro con busqueda y filtros combinados.</p>
        <div className="grid">
          <label>Buscar por titulo<input value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} /></label>
          <label>Categoria<select value={filters.categoryId} onChange={e => setFilters({ ...filters, categoryId: e.target.value })}><option value="">Todas</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label>Disponibilidad<select value={filters.available} onChange={e => setFilters({ ...filters, available: e.target.value })}><option value="">Todas</option><option value="true">Disponible</option><option value="false">Prestado</option></select></label>
          <label>Ano desde<input type="number" value={filters.year} onChange={e => setFilters({ ...filters, year: e.target.value })} /></label>
        </div>
        <div className="actions" style={{ marginTop: 12 }}><button onClick={loadData}>Aplicar filtros</button></div>
      </section>

      <section className="card">
        <h2>{editing ? "Editar libro" : "Nuevo libro"}</h2>
        {message && <div className={message.includes("correctamente") ? "notice" : "error"}>{message}</div>}
        <form onSubmit={submit} className="grid">
          <label>Titulo<input name="title" required minLength="2" value={form.title} onChange={change} /></label>
          <label>ISBN<input name="isbn" required minLength="5" value={form.isbn} onChange={change} /></label>
          <label>Ano<input name="year" type="number" min="1000" required value={form.year} onChange={change} /></label>
          <label>Autor<select name="authorId" required value={form.authorId} onChange={change}><option value="">Selecciona</option>{authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label>
          <label>Categoria<select name="categoryId" required value={form.categoryId} onChange={change}><option value="">Selecciona</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label>Disponible<input name="available" type="checkbox" checked={form.available} onChange={change} /></label>
          <div className="actions"><button>{editing ? "Actualizar" : "Crear"}</button><button type="button" className="secondary" onClick={() => { setForm(emptyBook); setEditing(null); }}>Limpiar</button></div>
        </form>
      </section>

      <section className="card">
        <h2>Listado</h2>
        <table>
          <thead><tr><th>Titulo</th><th>Autor</th><th>Categoria</th><th>Ano</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>{books.map(book => <tr key={book.id}><td>{book.title}<br /><span className="small">{book.isbn}</span></td><td>{book.Author?.name}</td><td>{book.Category?.name}</td><td>{book.year}</td><td><span className={book.available ? "badge ok" : "badge no"}>{book.available ? "Disponible" : "Prestado"}</span></td><td className="actions"><button onClick={() => edit(book)}>Editar</button><button className="danger" onClick={() => remove(book.id)}>Borrar</button></td></tr>)}</tbody>
        </table>
      </section>
    </>
  );
}
