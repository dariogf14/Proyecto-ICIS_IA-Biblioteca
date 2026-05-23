"use client";

import { useEffect, useState } from "react";

export default function LoanManager() {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ bookId: "", memberId: "", loanDate: new Date().toISOString().slice(0, 10) });
  const [message, setMessage] = useState("");

  async function loadData() {
    // funcion para cargar prestamos
    const [loansRes, booksRes, membersRes] = await Promise.all([
      fetch("/api/loans"),
      fetch("/api/books?available=true"),
      fetch("/api/members")
    ]);
    setLoans(await loansRes.json());
    setBooks(await booksRes.json());
    setMembers(await membersRes.json());
  }

  useEffect(() => { loadData(); }, []);

  async function submit(event) {
    // funcion para registrar prestamo
    event.preventDefault();
    const res = await fetch("/api/loans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) return setMessage((data.errors || [data.error]).join(". "));
    setMessage("Prestamo guardado correctamente");
    setForm({ bookId: "", memberId: "", loanDate: new Date().toISOString().slice(0, 10) });
    loadData();
  }

  async function returnLoan(id) {
    // funcion para marcar devolucion
    await fetch(`/api/loans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ returnDate: new Date().toISOString().slice(0, 10) })
    });
    loadData();
  }

  return (
    <>
      <section className="card">
        <h1>Prestamos</h1>
        <p className="small">Flujo: elegir libro disponible, elegir socio y registrar prestamo.</p>
      </section>
      <section className="card">
        <h2>Nuevo prestamo</h2>
        {message && <div className={message.includes("correctamente") ? "notice" : "error"}>{message}</div>}
        <form onSubmit={submit} className="grid">
          <label>Libro<select required value={form.bookId} onChange={e => setForm({ ...form, bookId: e.target.value })}><option value="">Selecciona</option>{books.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}</select></label>
          <label>Socio<select required value={form.memberId} onChange={e => setForm({ ...form, memberId: e.target.value })}><option value="">Selecciona</option>{members.map(member => <option key={member.id} value={member.id}>{member.name}</option>)}</select></label>
          <label>Fecha<input type="date" required value={form.loanDate} onChange={e => setForm({ ...form, loanDate: e.target.value })} /></label>
          <div className="actions"><button>Registrar</button></div>
        </form>
      </section>
      <section className="card">
        <h2>Listado</h2>
        <table><thead><tr><th>Libro</th><th>Socio</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{loans.map(loan => <tr key={loan.id}><td>{loan.Book?.title}</td><td>{loan.Member?.name}</td><td>{loan.loanDate}</td><td><span className={loan.status === "activo" ? "badge no" : "badge ok"}>{loan.status}</span></td><td>{loan.status === "activo" && <button onClick={() => returnLoan(loan.id)}>Marcar devuelto</button>}</td></tr>)}</tbody></table>
      </section>
    </>
  );
}
