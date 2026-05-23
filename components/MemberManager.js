"use client";

import { useEffect, useState } from "react";

const emptyMember = { name: "", email: "", phone: "" };

export default function MemberManager() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(emptyMember);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  async function loadMembers() {
    // funcion para cargar socios
    const res = await fetch(`/api/members?search=${search}`);
    setMembers(await res.json());
  }

  useEffect(() => { loadMembers(); }, []);

  async function submit(event) {
    // funcion para guardar socio
    event.preventDefault();
    const url = editing ? `/api/members/${editing}` : "/api/members";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) return setMessage((data.errors || [data.error]).join(". "));
    setForm(emptyMember);
    setEditing(null);
    setMessage("Socio guardado correctamente");
    loadMembers();
  }

  function edit(member) {
    // funcion para editar socio
    setEditing(member.id);
    setForm({ name: member.name, email: member.email, phone: member.phone });
  }

  async function remove(id) {
    // funcion para borrar socio
    if (!confirm("Seguro que quieres borrar este socio?")) return;
    await fetch(`/api/members/${id}`, { method: "DELETE" });
    loadMembers();
  }

  return (
    <>
      <section className="card">
        <h1>Socios</h1>
        <div className="actions"><label>Buscar<input value={search} onChange={e => setSearch(e.target.value)} /></label><button onClick={loadMembers}>Buscar</button></div>
      </section>
      <section className="card">
        <h2>{editing ? "Editar socio" : "Nuevo socio"}</h2>
        {message && <div className={message.includes("correctamente") ? "notice" : "error"}>{message}</div>}
        <form onSubmit={submit} className="grid">
          <label>Nombre<input required minLength="2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
          <label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
          <label>Telefono<input required minLength="2" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
          <div className="actions"><button>{editing ? "Actualizar" : "Crear"}</button><button type="button" className="secondary" onClick={() => { setForm(emptyMember); setEditing(null); }}>Limpiar</button></div>
        </form>
      </section>
      <section className="card">
        <h2>Listado</h2>
        <table><thead><tr><th>Nombre</th><th>Email</th><th>Telefono</th><th>Acciones</th></tr></thead><tbody>{members.map(member => <tr key={member.id}><td>{member.name}</td><td>{member.email}</td><td>{member.phone}</td><td className="actions"><button onClick={() => edit(member)}>Editar</button><button className="danger" onClick={() => remove(member.id)}>Borrar</button></td></tr>)}</tbody></table>
      </section>
    </>
  );
}
